import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Phone } from "lucide-react";
import { Twirl } from "hamburger-react";
import servicesData from "../data/services.json";
import PhoneCallModal from "./PhoneCallModal";

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
        <div className="flex items-center justify-between h-28 px-4 md:px-8">
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
          <div className="hidden lg:flex items-center space-x-12">
            {/* Main Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={item.href.startsWith("#") ? item.href : item.href}
                    className={`flex items-center text-base font-medium px-4 py-2 rounded-md transition-colors group-hover:text-secondary relative ${
                      isActive(item.href)
                        ? "text-secondary"
                        : isScrolled || shouldUseBlackText
                          ? "text-dark hover:bg-gray-50"
                          : "text-white hover:bg-white/10"
                    }`}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup={
                      item.dropdown || item.megaMenu ? "true" : "false"
                    }
                  >
                    {item.label}
                    {(item.dropdown || item.megaMenu) && (
                      <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {item.megaMenu && activeDropdown === item.label && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-[600px] bg-white shadow-xl rounded-b-lg overflow-hidden transition-opacity duration-200 z-50">
                      <div className="grid grid-cols-2 gap-4 p-4">
                        {item.megaMenu.map((category, index) => (
                          <div key={index} className="grid gap-1">
                            {category.items.map((service) => (
                              <Link
                                key={service.name}
                                to={getServiceUrl(service.name)}
                                className="px-2 py-1 text-sm hover:bg-gray-50 transition-colors rounded text-secondary hover:text-primary flex items-center"
                              >
                                <service.icon className="w-4 h-4 mr-2" />
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regular Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div
                      className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-lg overflow-hidden transition-opacity duration-200 z-50"
                      role="menu"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block px-4 py-3 text-sm text-dark hover:bg-gray-50 hover:text-secondary transition-colors"
                          role="menuitem"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
          <div className="lg:hidden z-50">
            <div className="text-gray-600 hover:text-primary focus:outline-none">
              <Twirl 
                size={24}
                toggled={isOpen}
                toggle={setIsOpen}
                duration={0.3}
                color={isScrolled ? "#374151" : "#1B4332"}
                label="Show menu"
              />
            </div>
          </div>
        </div>
        {/* Mobile menu - overlay */}
        {isOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          >
            {/* Mobile menu - content */}
            <div 
              className="bg-white h-full w-full max-w-sm overflow-y-auto transition-transform duration-300 transform translate-x-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <img
                      src="/images/Handyman_Logo.png"
                      alt="Handyman Wannabe"
                      className="h-12 w-auto"
                    />
                  </Link>
                  <button
                    className="text-gray-500 hover:text-gray-700 p-2"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="overflow-y-auto max-h-[70vh] pb-20">
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-gray-100 py-1">
                      {item.dropdown || item.megaMenu ? (
                        <div>
                          <button
                            className="w-full text-left text-lg font-semibold py-3 flex justify-between items-center"
                            onClick={() =>
                              setActiveMobileSubmenu(
                                activeMobileSubmenu === item.label
                                  ? null
                                  : item.label,
                              )
                            }
                          >
                            {item.label}
                            {activeMobileSubmenu === item.label ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>

                          {/* Services Menu Special Case */}
                          {item.label === "SERVICES" && activeMobileSubmenu === item.label && (
                            <div className="pl-2 pt-2 pb-2 space-y-1 max-h-[50vh] overflow-y-auto">
                              {serviceCategories.map((category, catIndex) => (
                                <div key={catIndex} className="mb-2">
                                  {category.items.map((service) => (
                                    <Link
                                      key={service.name}
                                      to={`/${service.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}-page`}
                                      className="flex items-center py-2 px-2 hover:bg-gray-50 rounded-md"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <service.icon className="w-5 h-5 mr-3 text-primary" />
                                      <span>{service.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Other dropdown menus */}
                          {item.label !== "SERVICES" && activeMobileSubmenu === item.label && (
                            <div className="pl-4 pt-2 pb-2 space-y-2">
                              {item.dropdown?.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  to={subItem.href}
                                  className="block py-2"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          className="block text-lg font-semibold py-3"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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