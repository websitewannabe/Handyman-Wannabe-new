import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronDown,
  PhoneCall,
  Search,
} from "lucide-react";
import PhoneCallModal from "./PhoneCallModal";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { serviceCategories } from "../data/services.json";
import * as Icons from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
  megaMenu?: { items: { name: string; icon: any; href?: string }[] }[];
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "SERVICES",
    href: "/services",
    megaMenu: serviceCategories,
  },
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const isScrolled = useScrollPosition();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();

  const currentPath = location.pathname;
  const shouldUseBlackText = [
    "/services",
    "/packages",
    "/how-it-works",
    "/about-us",
    "/careers",
    "/meet-the-team",
    "/service-area",
    "/contact",
    "/faq",
    "/accessibility",
    "/sitemap",
    "/blog",
    "/404",
  ].includes(currentPath) || currentPath.includes("404") || currentPath === "*";

  useEffect(() => {
    setIsOpen(false);
    setMobileSubMenuOpen(null);
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  const isActive = (href: string) => location.pathname === href;

  const getServiceUrl = (serviceName: string) => {
    const specialUrls: Record<string, string> = {
      "Smart Home": "/services/smart-homes",
      "Property Management": "/services/management-companies",
      "Third Party Moving": "/services/third-party-moving",
      "Home Inspections": "/services/home-inspections",
      "Misc.": "/services/misc",
      "General Assembly": "/services/furniture-assembly",
    };

    return specialUrls[serviceName] || `/services/${serviceName.toLowerCase().replace(/\s+&\s+|-/g, "-").replace(/\s+/g, "-")}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || shouldUseBlackText ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/images/handyman-wannabe-logo.webp"
                alt="Handyman Wannabe Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={item.href.startsWith("#") ? "#" : item.href}
                    className={`flex items-center text-base font-medium px-4 py-2 rounded-md transition-colors ${
                      isActive(item.href)
                        ? "text-secondary"
                        : isScrolled || shouldUseBlackText
                        ? "text-dark hover:bg-gray-50"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    {(item.dropdown || item.megaMenu) && (
                      <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === item.label && item.dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
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
                      </motion.div>
                    )}

                    {/* Mega Menu */}
                    {activeDropdown === item.label && item.megaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 w-screen max-w-7xl -ml-72 mt-2 px-2"
                      >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid grid-cols-2 gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {item.megaMenu.map((column, columnIndex) => (
                              <div key={columnIndex} className="space-y-4">
                                {column.items.map((menuItem) => {
                                  const IconComponent = (Icons as any)[
                                    menuItem.icon
                                  ];
                                  return (
                                    <Link
                                      key={menuItem.name}
                                      to={
                                        menuItem.href ||
                                        getServiceUrl(menuItem.name)
                                      }
                                      className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                      <div className="flex-shrink-0">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                      </div>
                                      <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                          {menuItem.name}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* CTA Buttons */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <PhoneCall className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${
                  isScrolled || shouldUseBlackText
                    ? "text-gray-700"
                    : "text-white"
                }`}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.dropdown || item.megaMenu ? (
                      <button
                        onClick={() =>
                          setMobileSubMenuOpen(
                            mobileSubMenuOpen === item.label ? null : item.label
                          )
                        }
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-5 h-5 transform transition-transform ${
                            mobileSubMenuOpen === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.label}
                      </Link>
                    )}

                    {mobileSubMenuOpen === item.label && item.dropdown && (
                      <div className="pl-4">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}

                    {mobileSubMenuOpen === item.label && item.megaMenu && (
                      <div className="pl-4">
                        {item.megaMenu.map((column) =>
                          column.items.map((menuItem) => {
                            const IconComponent = (Icons as any)[menuItem.icon];
                            return (
                              <Link
                                key={menuItem.name}
                                to={
                                  menuItem.href || getServiceUrl(menuItem.name)
                                }
                                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                              >
                                <IconComponent className="w-5 h-5 mr-2 text-primary" />
                                {menuItem.name}
                              </Link>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <button
                  className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 mr-2" />
                    <span>Call Now</span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Phone Call Modal */}
      <PhoneCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;