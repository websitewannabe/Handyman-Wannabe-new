import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"; // Added import for Lucide icons

interface NavItem {
  label: string;
  path?: string;
  dropdown?: NavDropdownItem[];
  megaMenu?: boolean;
}

interface NavDropdownItem {
  label: string;
  description?: string;
  path: string;
  icon?: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "HOME", path: "/" },
  {
    label: "SERVICES",
    megaMenu: true,
    dropdown: [
      {
        label: "Handyman Services",
        path: "/services/handyman",
        description: "General repairs and maintenance"
      },
      {
        label: "Electrical",
        path: "/services/electrical",
        description: "Professional electrical solutions"
      },
      {
        label: "Plumbing",
        path: "/services/plumbing",
        description: "Expert plumbing services"
      },
      // Add other service items as needed
    ]
  },
  { label: "PACKAGES", path: "/packages" },
  { label: "SERVICE AREA", path: "/service-area" },
  { label: "BLOG", path: "/blog" },
  { label: "ABOUT", path: "/about" }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
    setSelectedCategory(null);
  }, [location.pathname]);

  const shouldUseBlackText = location.pathname !== "/";

  const NavLink: React.FC<{ item: NavItem }> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      if (item.dropdown || item.megaMenu) {
        setIsHovered(true);
        setSelectedCategory(item.label);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setSelectedCategory(null);
    };

    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {item.path ? (
          <Link
            to={item.path}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              isScrolled || shouldUseBlackText
                ? "text-dark hover:text-primary"
                : "text-white hover:text-secondary"
            }`}
          >
            <span className="flex items-center gap-1">
              {item.label}
              {(item.dropdown || item.megaMenu) && (
                <ChevronDown className="w-4 h-4" />
              )}
            </span>
          </Link>
        ) : (
          <button
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              isScrolled || shouldUseBlackText
                ? "text-dark hover:text-primary"
                : "text-white hover:text-secondary"
            }`}
          >
            <span className="flex items-center gap-1">
              {item.label}
              {(item.dropdown || item.megaMenu) && (
                <ChevronDown className="w-4 h-4" />
              )}
            </span>
          </button>
        )}

        {/* Dropdown/Mega Menu */}
        <AnimatePresence>
          {isHovered && item.dropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50"
            >
              {item.dropdown.map((dropdownItem, index) => (
                <Link
                  key={index}
                  to={dropdownItem.path}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {dropdownItem.label}
                      </div>
                      {dropdownItem.description && (
                        <div className="text-sm text-gray-500">
                          {dropdownItem.description}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/75 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between h-28 px-8">
          {/* Logo */}
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
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <NavLink key={index} item={item} />
            ))}

            {/* CTA Button */}
            <a
              href="https://book.housecallpro.com/book/Handyman-Wannabe-LLC/15e9785faf164524b7cad4c718a9ea32"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled || shouldUseBlackText ? "text-dark" : "text-white"
              } hover:text-secondary p-2`}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.path ? (
                      <Link
                        to={item.path}
                        className="block py-2 px-4 text-gray-900 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        className="w-full text-left py-2 px-4 text-gray-900 hover:bg-gray-50 rounded-lg"
                        onClick={() => setSelectedCategory(item.label)}
                      >
                        <span className="flex items-center justify-between">
                          {item.label}
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </button>
                    )}

                    {selectedCategory === item.label && item.dropdown && (
                      <div className="pl-4 py-2 space-y-1">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            to={dropdownItem.path}
                            className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                            onClick={() => setIsOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Button */}
                <a
                  href="https://book.housecallpro.com/book/Handyman-Wannabe-LLC/15e9785faf164524b7cad4c718a9ea32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 px-4 text-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mt-4"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;