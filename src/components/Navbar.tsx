
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  X,
  Search,
  Menu,
  Home,
  ChevronDown,
  ChevronUp,
  Phone,
  Facebook,
  Instagram,
  Zap,
  Droplet,
  Paintbrush,
  Ruler,
  Hammer,
  DoorOpen,
  GarageDoor,
  Waves,
  Flower2,
  ClipboardCheck,
  Shield,
  SmartHome,
  Lock,
  Bath,
  Lightbulb,
  Sofa,
  Truck,
  Brush,
  Building2,
  Package,
  User,
} from "lucide-react";
import { Twirl } from "hamburger-react";
import servicesData from "../data/services.json";

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
  megaMenu?: { items: { name: string; icon: any }[] }[];
}

const serviceCategories = [
  {
    items: [
      { name: "Electrical", icon: Zap },
      { name: "Plumbing", icon: Droplet },
      { name: "Painting & Drywall", icon: Paintbrush },
      { name: "Flooring", icon: Ruler },
      { name: "Carpentry", icon: Hammer },
      { name: "Windows & Doors", icon: DoorOpen },
      { name: "Garage Doors", icon: GarageDoor },
      { name: "Powerwashing", icon: Waves },
      { name: "Landscaping", icon: Flower2 },
      { name: "Home Inspections", icon: ClipboardCheck },
    ],
  },
  {
    items: [
      { name: "Home Security", icon: Shield },
      { name: "Smart Home", icon: SmartHome },
      { name: "Locksmithing", icon: Lock },
      { name: "Pools & Spas", icon: Bath },
      { name: "Holiday Lighting", icon: Lightbulb },
      { name: "Furniture Assembly", icon: Sofa },
      { name: "Third Party Moving", icon: Truck },
      { name: "Cleaning", icon: Brush },
      { name: "Property Management", icon: Building2 },
      { name: "Misc.", icon: Package },
    ],
  },
];

const Navbar: React.FC = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdowns when navigating
  useEffect(() => {
    setIsServicesOpen(false);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setServicesExpanded(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".mobile-menu")
      ) {
        setIsServicesOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle body overflow when mobile menu is open
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

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = servicesData.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
    setIsSearchOpen(false);
  };

  const toggleSearchDropdown = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsServicesOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesAccordion = () => {
    setServicesExpanded(!servicesExpanded);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div ref={navRef} className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/handyman-wannabe-logo.png"
              alt="Handyman Wannabe"
              className="h-12 md:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <div className="relative">
              <button
                className={`nav-link flex items-center ${
                  isServicesOpen ? "text-primary" : ""
                }`}
                onClick={toggleServicesDropdown}
              >
                Services
                {isServicesOpen ? (
                  <ChevronUp className="ml-1 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-1 w-4 h-4" />
                )}
              </button>

              {/* Services Mega Menu */}
              <CSSTransition
                in={isServicesOpen}
                timeout={200}
                classNames="dropdown"
                unmountOnExit
              >
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 mt-2 w-screen max-w-4xl">
                  <div className="grid grid-cols-2 gap-6">
                    {serviceCategories.map((category, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-2 gap-3">
                          {category.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={`/${item.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/&/g, "and")}`}
                              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                            >
                              <item.icon className="w-5 h-5 text-primary mr-2" />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CSSTransition>
            </div>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/pricing" className="nav-link">
              Pricing
            </Link>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          {/* Search and Call Buttons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={toggleSearchDropdown}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Search Dropdown */}
              <CSSTransition
                in={isSearchOpen}
                timeout={200}
                classNames="dropdown"
                unmountOnExit
              >
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-2 border-b">
                    <div className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search for services..."
                        className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {searchResults.length > 0 && (
                    <ul className="max-h-60 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <li key={index}>
                          <Link
                            to={`/service/${result.id}`}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {result.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CSSTransition>
            </div>

            <a
              href="tel:7193156628"
              className="flex items-center text-primary font-bold"
            >
              <Phone className="w-5 h-5 mr-1" />
              (719) 315-6628
            </a>

            <Link
              to="/get-quote"
              className="btn-primary whitespace-nowrap py-2 px-4 text-sm"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full text-gray-600"
              aria-label="Toggle mobile menu"
            >
              <Hamburger
                toggled={isMobileMenuOpen}
                size={20}
                direction="right"
                duration={0.3}
                easing="ease-in-out"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <CSSTransition
        in={isMobileMenuOpen}
        timeout={300}
        classNames="mobile-menu"
        unmountOnExit
      >
        <div className="lg:hidden mobile-menu fixed top-[68px] left-0 right-0 bottom-0 bg-white z-50 overflow-hidden flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <input
                ref={mobileSearchInputRef}
                type="text"
                placeholder="Search for services..."
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {searchResults.length > 0 && (
              <ul className="mt-2 bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <Link
                      to={`/service/${result.id}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {result.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation Links with Scrollable Area */}
          <div className="flex-1 overflow-y-auto pb-20">
            <Link
              to="/"
              className="block px-4 py-3 text-lg border-b hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="w-5 h-5 mr-2 text-primary" />
                HOME
              </div>
            </Link>

            {/* Services Accordion */}
            <div className="border-b">
              <button
                className="w-full px-4 py-3 text-lg flex items-center justify-between hover:bg-gray-50"
                onClick={toggleServicesAccordion}
              >
                <span className="font-medium">SERVICES</span>
                {servicesExpanded ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary" />
                )}
              </button>

              {/* Services List - Scrollable */}
              {servicesExpanded && (
                <div className="max-h-[60vh] overflow-y-auto">
                  {serviceCategories.flatMap((category) =>
                    category.items.map((item, index) => (
                      <Link
                        key={index}
                        to={`/${item.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/&/g, "and")}`}
                        className="block pl-6 pr-4 py-3 border-t border-gray-100 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <item.icon className="w-5 h-5 mr-2 text-primary" />
                          {item.name}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="block px-4 py-3 text-lg border-b hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                ABOUT
              </div>
            </Link>
            <Link
              to="/pricing"
              className="block px-4 py-3 text-lg border-b hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <DoorOpen className="w-5 h-5 mr-2 text-primary" />
                PRICING
              </div>
            </Link>
            <Link
              to="/blog"
              className="block px-4 py-3 text-lg border-b hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <ClipboardCheck className="w-5 h-5 mr-2 text-primary" />
                BLOG
              </div>
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 text-lg border-b hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                CONTACT
              </div>
            </Link>
          </div>

          {/* Sticky Bottom CTA */}
          <div className="sticky bottom-0 border-t bg-white p-4 shadow-inner">
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:7193156628"
                className="flex items-center justify-center bg-white border border-primary text-primary font-bold py-3 px-4 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5 mr-1" />
                Call Now
              </a>
              <Link
                to="/get-quote"
                className="btn-primary py-3 px-4 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </CSSTransition>
    </header>
  );
};

export default Navbar;
