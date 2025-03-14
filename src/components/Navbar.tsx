import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data/navigation";
import PhoneCallModal from "./PhoneCallModal";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Phone,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
  megaMenu?: { items: { name: string; icon: any; href?: string }[] }[];
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      if (megaMenuOpen) {
        setMegaMenuOpen(false);
      }
    };

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [megaMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  const handleDropdownEnter = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) {
      setIsMobileMenuOpen(false);
    } else {
      setMegaMenuOpen(!megaMenuOpen);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const shouldUseBlackText = location.pathname !== "/";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/75 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between h-28 px-8">
            <Link
              to="/"
              className="flex-shrink-0"
              aria-label="Handyman Wannabe - Home"
            >
              <img
                src="/images/Handyman_Logo.png"
                alt="Handyman Wannabe"
                className="h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={(e) => handleDropdownEnter(item.label, e)}
                    onMouseLeave={handleDropdownLeave}
                    onClick={(e) => e.preventDefault()}
                  >
                    <div>
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
                          <ChevronDown className="ml-1 w-4 h-4" />
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
                          {item.dropdown && (
                            <ChevronDown className="ml-1 w-4 h-4" />
                          )}
                        </Link>
                      )}
                    </div>

                    {/* Dropdowns */}
                    {item.dropdown && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-48 py-2 bg-white rounded-lg shadow-lg">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center text-primary hover:text-primary/80"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="font-medium">Call Now</span>
                </button>
                <Link
                  to="https://book.housecallpro.com/book/Handyman-Wannabe-LLC/15e9785faf164524b7cad4c718a9ea32"
                  target="_blank"
                  className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white">
              <div className="px-4 pt-2 pb-6">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      className="block py-2 text-gray-800 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
                <div className="py-4 flex flex-col items-center mt-2">
                  <button
                    className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      window.open(
                        "https://client.housecallpro.com/customer_portal/request-link?token=a723826f09b6469fb06bd0ddb961381b",
                        "_blank"
                      );
                    }}
                  >
                    Customer Portal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <PhoneCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;