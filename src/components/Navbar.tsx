import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
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
  ChevronUp,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PhoneCallModal from "./PhoneCallModal"; // Added import for the modal component
import MobileServicesPage from "./MobileServicesPage";

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
  megaMenu?: { items: { name: string; icon: any }[] }[];
}

const serviceCategories = [
  {
    items: [
      { name: "Carpentry", icon: Hammer },
      { name: "Cleaning", icon: Brush },
      { name: "Electrical", icon: Zap },
      { name: "Flooring", icon: Ruler },
      { name: "Furniture Assembly", icon: Sofa },
      { name: "Garage Doors", icon: GarageDoor },
      { name: "Holiday Lighting", icon: Lightbulb },
      { name: "Home Inspections", icon: ClipboardCheck },
      { name: "Home Security", icon: Shield },
      { name: "Landscaping", icon: Flower2 },
    ],
  },
  {
    items: [
      { name: "Locksmithing", icon: Lock },
      { name: "Misc.", icon: Package },
      { name: "Painting & Drywall", icon: Paintbrush },
      { name: "Plumbing", icon: Droplet },
      { name: "Pools & Spas", icon: Bath },
      { name: "Powerwashing", icon: Waves },
      { name: "Property Management", icon: Building2 },
      { name: "Smart Home", icon: SmartHome },
      { name: "Third Party Moving", icon: Truck },
      { name: "Windows & Doors", icon: DoorOpen },
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
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isModalOpen, setIsModalOpen] = useState(false); // Added modal open state
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileServicesOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDropdownEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
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

  const currentPath = location.pathname;
  // Check if we're on a page that should always have black text
  const shouldUseBlackText =
    [
      "/services",
      "/packages",
      "/how-it-works",
      "/about-us",
      "/careers",
      "/meet-the-team",
      "/service-area",
      "/contact",
      "/faq",
      "/accessibility", // Added accessibility page
      "/sitemap", // Added sitemap page
      "/blog", // Added blog page
      "/404", // Added 404 page
    ].includes(currentPath) ||
    currentPath.includes("404") ||
    currentPath.includes("not-found") ||
    window.location.pathname.includes("404") ||
    window.location.href.includes("404") ||
    currentPath === "*";

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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
    setMobileSubMenuOpen(null);
  }, [location.pathname]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  const toggleMobileSubMenu = (label: string) => {
    setMobileSubMenuOpen(mobileSubMenuOpen === label ? null : label);
  };

  // Helper function to convert strings to kebab-case
  const kebabCase = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  };

  const handleServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) {
      setIsMobileServicesOpen(true);
      setIsOpen(false); // Close the main mobile menu
    } else {
      setMegaMenuOpen(!megaMenuOpen);
    }
  };

  // Add/remove body class to prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileServicesOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }

    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileServicesOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Check if mega menu is open
      if (megaMenuOpen) {
        // Get the mega menu element
        const megaMenu = document.querySelector(".mega-menu-container");

        // If we found the mega menu and the click is outside it and not on the services nav item
        if (
          megaMenu &&
          !megaMenu.contains(event.target) &&
          !event.target.closest('[data-menu-trigger="SERVICES"]')
        ) {
          setMegaMenuOpen(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [megaMenuOpen]);

  return (
    <>
      {/* Mobile Services Page */}
      {isMobileServicesOpen && isMobile && (
        <div className="fixed inset-0 z-[60] bg-white">
          <MobileServicesPage onClose={() => setIsMobileServicesOpen(false)} />
        </div>
      )}

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
                          aria-expanded={megaMenuOpen ? "true" : "false"}
                          aria-haspopup="true"
                          data-menu-trigger="SERVICES" // Added data attribute
                        >
                          {item.label}
                          <ChevronDown className="ml-1 w-4 h-4" />
                        </button>
                      ) : (
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
                      )}
                    </div>

                    {/* Mega Menu */}
                    {item.megaMenu &&
                      megaMenuOpen &&
                      item.label === "SERVICES" && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-[600px] bg-white shadow-xl rounded-b-lg overflow-hidden transition-opacity duration-200 z-50 mega-menu-container">
                          {" "}
                          {/* Added class for selection */}
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
                {/*Start of Housecall Pro Customer Portal button*/}
                <button
                  data-token="a723826f09b6469fb06bd0ddb961381b"
                  data-orgname="Handyman-Wannabe-LLC"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://client.housecallpro.com/customer_portal/request-link?token=a723826f09b6469fb06bd0ddb961381b",
                      "_blank",
                    );
                  }}
                  className="bg-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-secondary/90 transition-colors"
                >
                  Customer Portal
                </button>
                {/*End of Housecall Pro Customer Portal button*/}
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
          {/* Mobile menu */}
          {isOpen && (
            <div className="lg:hidden bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1 list-none">
                {navItems.map((item) => (
                  <div key={item.label} className="w-full">
                    {/* First level item */}
                    {item.dropdown || item.megaMenu ? (
                      // Items with dropdown - special handling for SERVICES on mobile
                      item.label === "SERVICES" ? (
                        <Link
                          to="/mobileservicespage" // Updated link for Services
                          className={`block py-3 text-lg font-medium ${
                            isActive("/mobileservicespage")
                              ? "text-primary"
                              : isScrolled
                                ? "text-dark"
                                : shouldUseBlackText
                                  ? "text-dark"
                                  : "text-dark"
                          }`}
                          onClick={() => {
                            setIsOpen(false); // Close the mobile menu after click
                            setActiveDropdown(null);
                          }}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        // Other dropdown items
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation
                            setActiveDropdown(
                              activeDropdown === item.label ? null : item.label,
                            );
                          }}
                          className={`group flex items-center justify-between w-full py-3 text-lg font-medium ${
                            activeDropdown === item.label
                              ? "text-primary"
                              : isScrolled
                                ? "text-dark"
                                : shouldUseBlackText
                                  ? "text-dark"
                                  : "text-dark"
                          }`}
                          aria-expanded={activeDropdown === item.label}
                          data-menu-trigger={item.label}
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              activeDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )
                    ) : (
                      // Regular links
                      <Link
                        to={item.href}
                        className={`block py-3 text-lg font-medium ${
                          isActive(item.href)
                            ? "text-primary"
                            : isScrolled
                              ? "text-dark"
                              : shouldUseBlackText
                                ? "text-dark"
                                : "text-dark"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // Stop event propagation
                          setIsOpen(false); // Close mobile menu after link click
                          setActiveDropdown(null);
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                    {/* For mobile submenu */}
                    {mobileSubMenuOpen === item.label && (
                      <div className="pl-4 pr-2 py-2 space-y-1">
                        {item.dropdown?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block px-3 py-2 text-base font-medium text-dark hover:bg-gray-100 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation(); // Stop event propagation
                              setIsOpen(false); // Close mobile menu
                              setMobileSubMenuOpen(null); // Close submenu
                            }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Phone number in mobile menu */}
                <div className="py-4 flex flex-col items-center mt-2">
                  <a
                    href="tel:7193156628"
                    className="flex items-center text-xl font-bold text-primary hover:text-secondary transition-colors py-2"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    (719) 315-6628
                  </a>
                  <button className="mt-4 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors">
                    Get a Quote
                  </button>
                </div>
              </div>
            </div>
          )}
          <PhoneCallModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />{" "}
          {/* Added modal rendering */}
          {/* Services Mega Menu for Desktop - Handled in the nav items section */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
