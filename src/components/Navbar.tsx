import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  Hammer,
  Brush,
  Zap,
  Ruler,
  Sofa,
  GarageDoor,
  Lightbulb,
  ClipboardCheck,
  Shield,
  Flower2,
  Lock,
  Package,
  Paintbrush,
  Droplet,
  Bath,
  Waves,
  Building2,
  SmartHome,
  Truck,
  DoorOpen,
  Menu,
  X,
  Phone,
} from "lucide-react";
import PhoneCallModal from "./PhoneCallModal";
import servicesData from "../data/services.json";

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
  megaMenu?: { items: { name: string; icon: any; href?: string }[] }[];
}

const serviceCategories = [
  {
    items: [
      { name: "Carpentry", icon: Hammer },
      { name: "Cleaning", icon: Brush },
      { name: "Electrical", icon: Zap },
      { name: "Flooring", icon: Ruler },
      { name: "Furniture Assembly", icon: Sofa, href: "/services/furniture-assembly" },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const shouldUseBlackText = location.pathname !== "/";
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
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
    }, 100);
  };

  const getServiceUrl = (serviceName: string) => {
    if (serviceName === "Smart Home") return "/services/smart-homes";
    if (serviceName === "Property Management") return "/services/management-companies";
    if (serviceName === "Third Party Moving") return "/services/third-party-moving";
    if (serviceName === "Home Inspections") return "/services/home-inspections";
    if (serviceName === "Misc.") return "/services/misc";
    if (serviceName === "General Assembly") return "/services/furniture-assembly";

    return `/services/${serviceName.toLowerCase().replace(/\s+&\s+|-/g, "-").replace(/\s+/g, "-")}`;
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={isScrolled || shouldUseBlackText ? "/images/logo-color.png" : "/images/logo-white.png"}
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
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
                  >
                    {item.label}
                    {(item.dropdown || item.megaMenu) && (
                      <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {item.megaMenu && activeDropdown === item.label && (
                    <div className="absolute top-full -left-60 w-[800px] bg-white rounded-lg shadow-lg mt-1 p-4 grid grid-cols-2 gap-4">
                      {item.megaMenu.map((column, columnIndex) => (
                        <div key={columnIndex} className="space-y-2">
                          {column.items.map((service) => (
                            <Link
                              key={service.name}
                              to={service.href || getServiceUrl(service.name)}
                              className="flex items-center p-2 rounded-md hover:bg-gray-50 text-dark"
                            >
                              {React.createElement(service.icon, {
                                className: "w-5 h-5 mr-3 text-primary",
                              })}
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg mt-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block px-4 py-2 text-dark hover:bg-gray-50"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* CTA Buttons */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center text-base font-medium px-4 py-2 rounded-md transition-colors hover:text-secondary"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </button>
                <a
                  href="https://book.housecallpro.com/book/Handyman-Wannabe-LLC/15e9785faf164524b7cad4c718a9ea32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`p-2 rounded-md ${
                  isScrolled || shouldUseBlackText ? "text-dark" : "text-white"
                }`}
              >
                <Phone className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${
                  isScrolled || shouldUseBlackText ? "text-dark" : "text-white"
                }`}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href.startsWith("#") ? item.href : item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-50"
                    onClick={() => item.href !== "#more" && setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown &&
                    item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        to={dropdownItem.href}
                        className="block px-3 py-2 pl-6 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                </div>
              ))}
            </div>

            {/* Mobile menu CTA */}
            <div className="py-4 flex flex-col items-center mt-2">
              <a
                href="https://book.housecallpro.com/book/Handyman-Wannabe-LLC/15e9785faf164524b7cad4c718a9ea32"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </nav>
      <PhoneCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;