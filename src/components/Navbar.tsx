import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  Package,
  User,
  MoreHorizontal,
  Phone
} from "lucide-react";
import servicesData from "../data/services.json";
import PhoneCallModal from "./PhoneCallModal"; // Retained from original code

interface NavItem {
  name: string;
  path: string;
  icon?: React.ElementType;
  children?: {
    title: string;
    items: { name: string; path: string }[];
  }[];
}

// Group services by category
const serviceCategories = Array.from(
  new Set(servicesData.map((service) => service.category))
).sort();

// Prioritize important service categories
const priorityCategories = [
  "Electrical",
  "Plumbing",
  "Flooring",
  "Painting",
  "Drywall",
  "Windows & Doors",
];

// Sort categories to put priority ones first
const sortedCategories = [
  ...priorityCategories.filter((cat) => serviceCategories.includes(cat)),
  ...serviceCategories.filter((cat) => !priorityCategories.includes(cat)),
];

// Secondary categories for "More" dropdown
const secondaryCategories = sortedCategories.slice(6);
const primaryCategories = sortedCategories.slice(0, 6);

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  // For horizontal scroll controls
  const menuRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Retained from original code


  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Services",
      path: "/services",
      children: primaryCategories.map((category) => ({
        title: category,
        items: servicesData
          .filter((service) => service.category === category)
          .map((service) => ({
            name: service.name,
            path: `/service/${service.id}`,
          })),
      })),
    },
    {
      name: "More",
      path: "#",
      children: secondaryCategories.map((category) => ({
        title: category,
        items: servicesData
          .filter((service) => service.category === category)
          .map((service) => ({
            name: service.name,
            path: `/service/${service.id}`,
          })),
      })),
    },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  // Check if we need to show scroll arrows
  const checkScrollArrows = () => {
    if (menuRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll handlers for nav menu
  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      checkScrollArrows();
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check for arrows
    checkScrollArrows();

    // Add scroll event listener to the menu for arrow visibility
    if (menuRef.current) {
      menuRef.current.addEventListener("scroll", checkScrollArrows);
    }

    // Handle window resize to check for arrows
    window.addEventListener("resize", checkScrollArrows);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollArrows);
      if (menuRef.current) {
        menuRef.current.removeEventListener("scroll", checkScrollArrows);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  // Close dropdown when navigating
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
  }, [location.pathname]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div
      ref={navRef}
      className={`w-full z-50 ${
        scrollPosition > 50
          ? "sticky top-0 bg-white shadow-md"
          : "bg-white shadow-sm"
      } transition-all duration-300`}
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/Handyman_Wannabe.png" 
              alt="Handyman Wannabe" 
              className="h-10 w-auto mr-2" 
            />
            <div className="font-bold text-lg text-primary hidden sm:block">
              Handyman Wannabe
            </div>
          </Link>

          {/* Navigation Container */}
          <div className="relative flex-1 px-2 max-w-4xl mx-auto">
            {/* Left scroll button */}
            {showLeftArrow && (
              <button 
                onClick={scrollLeft} 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 rounded-full shadow-md p-1 hover:bg-gray-100"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
            )}

            {/* Scrollable menu */}
            <div 
              ref={menuRef}
              className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-hide snap-x"
              onScroll={checkScrollArrows}
            >
              {navItems.map((item) => (
                <div key={item.name} className="snap-start flex-shrink-0">
                  {item.children ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap ${
                          activeDropdown === item.name
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>

                      {activeDropdown === item.name && (
                        <div className="absolute left-0 z-10 mt-1 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-auto min-w-[280px] max-h-[80vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                          {item.children.map((category) => (
                            <div key={category.title} className="p-2">
                              <h3 className="font-bold text-gray-800 px-3 py-2">
                                {category.title}
                              </h3>
                              <ul>
                                {category.items.slice(0, 6).map((subItem, idx) => (
                                  <li key={idx}>
                                    <Link
                                      to={subItem.path}
                                      className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md truncate"
                                      title={subItem.name}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                                {category.items.length > 6 && (
                                  <Link
                                    to={`/service-category/${category.title.toLowerCase()}`}
                                    className="block px-3 py-2 text-sm text-primary hover:bg-gray-100 rounded-md font-medium"
                                  >
                                    View all ({category.items.length})
                                  </Link>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap ${
                        isActive(item.path)
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right scroll button */}
            {showRightArrow && (
              <button 
                onClick={scrollRight} 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 rounded-full shadow-md p-1 hover:bg-gray-100"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            )}
          </div>

          {/* User buttons */}
          <div className="flex items-center space-x-2">
            <Link
              to="/quote"
              className="hidden md:inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              <Package className="w-4 h-4 mr-1" />
              Get a Quote
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="w-4 h-4 mr-1" />
              <span className="hidden md:inline">Login</span>
            </Link>
          </div>
        </div>
      </div>
      <PhoneCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Navbar;