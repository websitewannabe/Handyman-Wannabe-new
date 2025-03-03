import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Phone,
  Zap,
  Droplet,
  Paintbrush,
  Ruler,
  Hammer,
  DoorOpen,
  Car as GarageDoor,
  Waves,
  Flower2,
  ClipboardCheck,
  Shield,
  Home as SmartHome,
  Lock,
  Bath,
  Lightbulb,
  Sofa,
  Truck,
  Brush,
  Building2,
  Package,
  Search
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PhoneCallModal from "./PhoneCallModal"; // Added import for the modal component

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

const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "SERVICES",
    href: "#services",
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
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const getServiceUrl = (service: string) => {
    // Special cases for services with different URL patterns
    if (service === "Smart Home") {
      return "/services/smart-homes";
    }
    if (service === "Property Management") {
      return "/services/management-companies";
    }
    if (service === "Third Party Moving") {
      return "/services/third-party-moving";
    }
    if (service === "Home Inspections") {
      return "/services/home-inspections";
    }
    if (service === "Misc.") {
      return "/services/misc";
    }

    // Handle other services
    const slug = service
      .toLowerCase()
      .replace(/\s+&\s+|-/g, "-")
      .replace(/\s+/g, "-");
    return `/services/${slug}`;
  };

  const shouldUseBlackText =
    location.pathname === "/how-it-works" ||
    location.pathname === "/service-area" ||
    location.pathname === "/about-us" ||
    location.pathname === "/careers" ||
    location.pathname === "/meet-the-team" ||
    location.pathname === "/faq" ||
    location.pathname === "/contact" ||
    location.pathname === "/blog" ||
    location.pathname === "/packages";

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveMobileSubmenu(null);
  }, [location.pathname]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const [isModalOpen, setIsModalOpen] = useState(false); // Added modal open state

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/75 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1920px] mx-auto">
        {/* Combined Navigation Bar */}
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

          {/* Main Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navItems.map(({ label, href, dropdown, megaMenu }) => (
              <div
                key={label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to={href.startsWith("#") ? href : href}
                  className={`text-sm font-semibold px-4 py-2 rounded-lg ${
                    isActive(href)
                      ? "text-primary bg-primary/10"
                      : isScrolled
                        ? "text-gray-700 hover:text-primary"
                        : "text-white hover:text-primary"
                  } transition-colors`}
                >
                  {label}
                </Link>

                {/* Dropdown menu */}
                {dropdown && activeDropdown === label && (
                  <div className="absolute z-20 w-48 mt-1 rounded-lg shadow-lg py-1 bg-white border border-gray-100">
                    {dropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mega menu for Services */}
                {megaMenu && activeDropdown === label && (
                  <div className="absolute z-20 mt-1 w-[600px] bg-white rounded-lg shadow-lg flex p-4 border border-gray-100 left-1/2 -translate-x-1/2">
                    {megaMenu.map((column, index) => (
                      <div key={index} className="flex-1 px-2">
                        <ul className="space-y-3">
                          {column.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={`/${item.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="flex items-center text-gray-700 hover:text-primary"
                              >
                                <item.icon className="w-5 h-5 mr-2" />
                                <span>{item.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search */}
            <div
              className="relative"
              ref={searchRef}
              onBlur={() => {
                setTimeout(() => {
                  if (!searchRef.current?.contains(document.activeElement)) {
                    setIsSearchFocused(false);
                  }
                }, 100);
              }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  className={`${
                    isScrolled ? "bg-gray-100" : "bg-white/10 text-white"
                  } pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 w-40 md:w-64 transition-all`}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    // Simple search functionality (to be replaced with actual search)
                    if (e.target.value.length > 0) {
                      const filtered = serviceCategories.flat().filter((service) =>
                        service.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase()),
                      );
                      setSearchResults(filtered.slice(0, 5));
                    } else {
                      setSearchResults([]);
                    }
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                />
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isScrolled ? "text-gray-400" : "text-white/80"
                  }`}
                />
              </div>
            </div>

            {/* Phone Number and CTA */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center">
                <Phone
                  className={`w-5 h-5 ${isScrolled || shouldUseBlackText ? "text-[#00274D]" : "text-white"} mr-2`}
                />
                <span
                  className={`text-base font-medium ${isScrolled || shouldUseBlackText ? "text-[#00274D]" : "text-white"}`}
                >
                  (719) 315-6628
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)} // Open modal on click
                className="bg-primary text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-primary/90 transition-colors"
              >
                Have Our AI Call You
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled || shouldUseBlackText ? "text-dark" : "text-white"} hover:text-secondary p-2`}
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
        <div 
          ref={mobileMenuRef}
          className={`md:hidden fixed top-28 left-0 h-[calc(100vh-7rem)] w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-4 py-6 space-y-4 max-h-full">
            {/* Mobile Navigation Items */}
            <div className="space-y-2">
              {navItems.map(({ label, href, dropdown, megaMenu }) => (
                <div key={label} className="border-b border-gray-200 pb-2">
                  {/* If it has dropdown or megamenu, make it toggleable */}
                  {(dropdown || megaMenu) ? (
                    <div>
                      <button
                        className={`flex items-center justify-between w-full py-3 px-4 rounded-lg text-left text-base font-semibold ${
                          activeMobileSubmenu === label
                            ? "bg-primary/10 text-primary"
                            : "text-gray-700"
                        }`}
                        onClick={() => setActiveMobileSubmenu(activeMobileSubmenu === label ? null : label)}
                        aria-expanded={activeMobileSubmenu === label}
                      >
                        <span>{label}</span>
                        {activeMobileSubmenu === label ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>

                      {/* Services Accordion Menu */}
                      {activeMobileSubmenu === label && megaMenu && (
                        <div className="mt-2 mb-4 pl-4 space-y-3 max-h-[60vh] overflow-y-auto mobile-services-menu pb-4">
                          {megaMenu.flatMap((column) => 
                            column.items.map((item) => (
                              <Link
                                key={item.name}
                                to={`/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                                className={`flex items-center py-2 px-4 text-base rounded-lg ${
                                  location.pathname === `/${item.name.toLowerCase().replace(/\s+/g, "-")}`
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                <span>{item.name}</span>
                              </Link>
                            ))
                          )}
                        </div>
                      )}

                      {/* Dropdown Menu */}
                      {activeMobileSubmenu === label && dropdown && (
                        <div className="mt-2 pl-4 space-y-1">
                          {dropdown.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              className={`block py-2 px-4 text-base rounded-lg ${
                                location.pathname === item.href
                                  ? "bg-primary/10 text-primary"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular link without dropdown
                    <Link
                      to={href}
                      className={`block py-3 px-4 text-base font-semibold rounded-lg ${
                        isActive(href)
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Contact and CTA */}
            <div className="pt-4 space-y-4">
              <a
                href="tel:7193156628"
                className="flex items-center justify-center w-full py-3 px-4 bg-secondary text-white rounded-lg font-bold text-lg"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-5 h-5 mr-2" />
                (719) 315-6628
              </a>

              <button 
                className="w-full py-3 px-4 bg-primary text-white rounded-lg font-bold text-lg"
                onClick={() => {
                  navigate('/get-quote');
                  setIsOpen(false);
                }}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40" 
            onClick={() => setIsOpen(false)}
          />
        )}
        <PhoneCallModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />{" "}
        {/* Added modal rendering */}
      </div>
    </nav>
  );
};

export default Navbar;