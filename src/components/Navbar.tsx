import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Instagram,
  Clock,
} from "lucide-react";
import PhoneCallModal from "./PhoneCallModal";
import { serviceCategories } from "../data/services.json";
import * as Icons from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldUseBlackText, setShouldUseBlackText] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const nonWhiteTextPaths = ["/", "/about", "/services", "/packages"];
    setShouldUseBlackText(!nonWhiteTextPaths.includes(location.pathname));
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
    if (label === "SERVICES") {
      setMegaMenuOpen(true);
    }
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setMegaMenuOpen(false);
    }, 100);
  };

  const handleServiceClick = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) {
      e.preventDefault();
      setMegaMenuOpen(!megaMenuOpen);
    }
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const getServiceUrl = (serviceName: string) => {
    const specialCases: { [key: string]: string } = {
      "Smart Home": "smart-homes",
      "Property Management": "management-companies",
      "Third Party Moving": "third-party-moving",
      "Home Inspections": "home-inspections",
      "Misc.": "misc",
      "General Assembly": "furniture-assembly",
    };

    if (serviceName in specialCases) {
      return `/services/${specialCases[serviceName]}`;
    }

    return `/services/${serviceName.toLowerCase().replace(/\s+/g, "-")}`;
  };

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "SERVICES", href: "/services", megaMenu: true },
    { label: "SERVICE AREA", href: "/service-area" },
    { label: "PACKAGES", href: "/packages" },
    { label: "BLOG", href: "/blog" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/75 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between h-28 px-8">
            <Link to="/" className="flex-shrink-0" aria-label="Handyman Wannabe - Home">
              <img src="/images/Handyman_Logo.png" alt="Handyman Wannabe" className="h-16 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center space-x-12">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.label === "SERVICES" ? (
                      <button
                        onClick={handleServiceClick}
                        className={`flex items-center text-base font-medium px-4 py-2 rounded-md transition-colors group-hover:text-secondary relative ${
                          isActive(item.href)
                            ? "text-secondary"
                            : isScrolled || shouldUseBlackText
                              ? "text-dark hover:bg-gray-50"
                              : "text-white hover:bg-white/10"
                        }`}
                        aria-expanded={megaMenuOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className={`flex items-center text-base font-medium px-4 py-2 rounded-md transition-colors group-hover:text-secondary ${
                          isActive(item.href)
                            ? "text-secondary"
                            : isScrolled || shouldUseBlackText
                              ? "text-dark hover:bg-gray-50"
                              : "text-white hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {item.megaMenu && megaMenuOpen && (
                      <div
                        className="absolute left-0 w-screen max-w-7xl -ml-72 mt-0 flex"
                        onMouseEnter={() => handleDropdownEnter(item.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="w-full bg-white rounded-lg shadow-lg mt-4">
                          <div className="grid grid-cols-4 gap-x-8 gap-y-10 p-8">
                            {serviceCategories.map((category) => {
                              const IconComponent = (Icons as any)[category.icon] || Icons.Wrench;
                              return (
                                <div key={category.name} className="group relative">
                                  <Link
                                    to={getServiceUrl(category.name)}
                                    className="flex items-center text-dark hover:text-secondary"
                                  >
                                    <IconComponent className="h-6 w-6 text-primary mr-2" />
                                    <span className="font-medium">{category.name}</span>
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-6">
                <a
                  href="tel:+15038033117"
                  className="flex items-center text-base font-medium px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  <span>(503) 803-3117</span>
                </a>
              </div>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                  isScrolled || shouldUseBlackText ? "text-dark" : "text-white"
                } hover:text-secondary p-2`}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="lg:hidden bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.label === "SERVICES" ? (
                      <Link
                        to="/mobileservicespage"
                        className={`block py-3 text-lg font-medium ${
                          isActive("/mobileservicespage")
                            ? "text-primary"
                            : "text-dark hover:text-secondary"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block py-3 text-lg font-medium ${
                          isActive(item.href) ? "text-primary" : "text-dark hover:text-secondary"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-4">
                  <a
                    href="tel:+15038033117"
                    className="flex items-center justify-center text-base font-medium px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    <span>(503) 803-3117</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <PhoneCallModal isOpen={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)} />
    </>
  );
};

export default Navbar;