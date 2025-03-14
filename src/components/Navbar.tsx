import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import PhoneCallModal from "./PhoneCallModal";
import servicesData from "../data/services.json";

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
  megaMenu?: { items: { name: string; icon: keyof typeof Icons; href?: string }[] }[];
}

const serviceCategories = servicesData.serviceCategories;

const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services", megaMenu: serviceCategories },
  { label: "PROCESS", href: "/how-it-works" },
  { label: "PACKAGES", href: "/packages" },
  { label: "SERVICE AREA", href: "/service-area" },
  {
    label: "MORE",
    href: "#more",
    dropdown: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Meet Our Team", href: "/meet-the-team" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileSubMenuOpen(null);
  }, [location.pathname]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleMobileSubMenu = (label: string) => {
    setMobileSubMenuOpen(mobileSubMenuOpen === label ? null : label);
  };

  const renderMegaMenu = (item: NavItem) => {
    if (!item.megaMenu) return null;
    const isActive = activeDropdown === item.label;

    return (
      <div
        className={`absolute left-0 w-full bg-white shadow-lg transform transition-all duration-300 ${
          isActive
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
        onMouseEnter={() => handleDropdownEnter(item.label)}
        onMouseLeave={handleDropdownLeave}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 gap-8">
            {item.megaMenu.map((section, sectionIndex) => (
              <div key={sectionIndex} className="grid grid-cols-2 gap-4">
                {section.items.map((menuItem, index) => {
                  const IconComponent = Icons[menuItem.icon as keyof typeof Icons];
                  return (
                    <Link
                      key={index}
                      to={menuItem.href || `/services/${menuItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {IconComponent && <IconComponent className="w-5 h-5 text-primary mr-3" />}
                      <span className="text-gray-700 hover:text-primary">
                        {menuItem.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDropdown = (item: NavItem) => {
    if (!item.dropdown) return null;
    const isActive = activeDropdown === item.label;

    return (
      <div
        className={`absolute right-0 w-48 bg-white shadow-lg rounded-lg transform transition-all duration-300 ${
          isActive
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
        onMouseEnter={() => handleDropdownEnter(item.label)}
        onMouseLeave={handleDropdownLeave}
      >
        {item.dropdown.map((dropdownItem, index) => (
          <Link
            key={index}
            to={dropdownItem.href}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
          >
            {dropdownItem.label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/75 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between h-28 px-8">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/Handyman_Logo.png"
              alt="Handyman Wannabe"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to={item.href === "#more" ? "#" : item.href}
                  className={`text-sm font-bold hover:text-primary transition-colors ${
                    location.pathname === item.href ? "text-primary" : "text-dark"
                  }`}
                  onClick={(e) => {
                    if (item.href === "#more") {
                      e.preventDefault();
                    }
                  }}
                >
                  {item.label}
                </Link>
                {item.megaMenu && renderMegaMenu(item)}
                {item.dropdown && renderDropdown(item)}
              </div>
            ))}

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <Icons.X className="w-6 h-6" />
            ) : (
              <Icons.Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 lg:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "112px" }}
        >
          <div className="h-full overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label}>
                <div
                  className="flex items-center justify-between px-8 py-4 border-b border-gray-100"
                  onClick={() => {
                    if (item.dropdown || item.megaMenu) {
                      handleMobileSubMenu(item.label);
                    } else {
                      navigate(item.href);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <span className="font-bold">{item.label}</span>
                  {(item.dropdown || item.megaMenu) && (
                    <Icons.ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        mobileSubMenuOpen === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
                {mobileSubMenuOpen === item.label && (
                  <div className="bg-gray-50 px-8 py-4">
                    {item.dropdown?.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        to={dropdownItem.href}
                        className="block py-2 text-gray-700 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                    {item.megaMenu?.map((section) =>
                      section.items.map((menuItem, index) => {
                        const IconComponent = Icons[menuItem.icon as keyof typeof Icons];
                        return (
                          <Link
                            key={index}
                            to={
                              menuItem.href ||
                              `/services/${menuItem.name.toLowerCase().replace(/\s+/g, "-")}`
                            }
                            className="flex items-center py-2 text-gray-700 hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {IconComponent && (
                              <IconComponent className="w-5 h-5 mr-3 text-primary" />
                            )}
                            {menuItem.name}
                          </Link>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="px-8 py-4">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <PhoneCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;