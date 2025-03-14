import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Clock,
  DollarSign,
  Star,
} from "lucide-react";
import PhoneCallModal from "./PhoneCallModal";
import servicesData from "../data/services.json"; // Add this import

interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "Services",
    children: servicesData.serviceCategories.map((category) => ({
      label: category.name,
      path: `/services/${category.id}`,
    })),
  },
  { label: "Service Areas", path: "/service-areas" },
  { label: "About Us", path: "/about" },
  { label: "Packages", path: "/packages" },
  { label: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
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
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`text-lg font-medium transition-colors ${
                        isScrolled ? "text-gray-800" : "text-white"
                      } hover:text-primary ${isActive(item.path) ? 'text-primary' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={`text-lg font-medium transition-colors ${
                        isScrolled ? "text-gray-800" : "text-white"
                      } hover:text-primary flex items-center`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  )}

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 bg-white rounded-lg shadow-lg py-4 min-w-[200px] transform">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-6 py-2 text-gray-800 hover:bg-gray-50 hover:text-primary transition-colors ${isActive(child.path) ? 'text-primary' : ''}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 overflow-y-auto h-full">
              {navItems.map((item) => (
                <div key={item.label} className="mb-4">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`block text-lg font-medium text-gray-800 hover:text-primary ${isActive(item.path) ? 'text-primary' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className={`text-lg font-medium text-gray-800 hover:text-primary mb-2 flex items-center`}
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 ml-1 transform transition-transform ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`} />
                      </button>
                      {item.children && activeDropdown === item.label && (
                        <div className="pl-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`block text-gray-600 hover:text-primary ${isActive(child.path) ? 'text-primary' : ''}`}
                              onClick={() => setIsOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <button
                className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors w-full flex items-center justify-center"
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </nav>
      <PhoneCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;