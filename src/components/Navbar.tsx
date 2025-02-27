import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Zap, Droplet, Paintbrush, Ruler, Hammer, DoorOpen, Car as GarageDoor, Waves, Flower2, ClipboardCheck, Shield, Home as SmartHome, Lock, Bath, Lightbulb, Sofa, Truck, Brush, Building2, Package } from 'lucide-react';
import PhoneCallModal from './PhoneCallModal';

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; }[];
  megaMenu?: { items: { name: string; icon: any; }[]; }[];
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
      { name: "Home Inspections", icon: ClipboardCheck }
    ]
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
      { name: "Misc.", icon: Package }
    ]
  }
];

const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'SERVICES',
    href: '#services',
    megaMenu: serviceCategories
  },
  { label: 'PROCESS', href: '/how-it-works' },
  { label: 'PACKAGES', href: '/packages' },
  { label: 'SERVICE AREA', href: '/service-area' },
  {
    label: 'MORE',
    href: '#more',
    dropdown: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Careers', href: '/careers' },
      { label: 'Meet Our Team', href: '/meet-the-team' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      return '/services/smart-homes';
    }
    if (service === "Property Management") {
      return '/services/management-companies';
    }
    if (service === "Third Party Moving") {
      return '/services/third-party-moving';
    }
    if (service === "Home Inspections") {
      return '/services/home-inspections';
    }
    if (service === "Misc.") {
      return '/services/misc';
    }

    // Handle other services
    const slug = service.toLowerCase().replace(/\s+&\s+|-/g, '-').replace(/\s+/g, '-');
    return `/services/${slug}`;
  };

  const shouldUseBlackText = location.pathname === '/how-it-works' || 
                            location.pathname === '/service-area' || 
                            location.pathname === '/about-us' || 
                            location.pathname === '/careers' ||
                            location.pathname === '/meet-the-team' ||
                            location.pathname === '/faq' ||
                            location.pathname === '/contact' ||
                            location.pathname === '/blog' ||
                            location.pathname === '/packages';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/75 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
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
              src="https://handymanwannabe.com/wp-content/uploads/2024/02/Handyman-Wannabe-Logo_2-e1708983601229-300x74.png"
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
                    to={item.href.startsWith('#') ? item.href : item.href}
                    className={`flex items-center text-base font-medium px-4 py-2 rounded-md transition-colors group-hover:text-secondary relative ${
                      isActive(item.href) 
                        ? 'text-secondary' 
                        : isScrolled || shouldUseBlackText
                          ? 'text-dark hover:bg-gray-50'
                          : 'text-white hover:bg-white/10'
                    }`}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup={item.dropdown || item.megaMenu ? 'true' : 'false'}
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
                <Phone className={`w-5 h-5 ${isScrolled || shouldUseBlackText ? 'text-[#00274D]' : 'text-white'} mr-2`} />
                <span className={`text-base font-medium ${isScrolled || shouldUseBlackText ? 'text-[#00274D]' : 'text-white'}`}>
                  (719) 315-6628
                </span>
              </div>
              <button onClick={() => setIsPhoneModalOpen(true)} className="bg-primary text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-primary/90 transition-colors">
                Have Our AI Call You
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled || shouldUseBlackText ? 'text-dark' : 'text-white'} hover:text-secondary p-2`}
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
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md ${
                      isActive(item.href) ? 'text-secondary' : 'text-dark hover:bg-gray-50 hover:text-secondary'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-secondary rounded-md"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  {item.megaMenu && (
                    <div className="pl-4">
                      {item.megaMenu.map((category, index) => (
                        <div key={index}>
                          <div className="space-y-1">
                            {category.items.map((service) => (
                              <Link
                                key={service.name}
                                to={getServiceUrl(service.name)}
                                className="block px-3 py-2 text-sm text-secondary hover:bg-gray-50 hover:text-primary rounded-md flex items-center"
                              >
                                <service.icon className="w-4 h-4 mr-2" />
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 px-3">
                <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#00274D] mr-2" />
                    <span className="text-xl font-bold text-[#00274D]">(719) 315-6628</span>
                  </div>
                </div>
                <button onClick={() => setIsPhoneModalOpen(true)} className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors text-lg">
                  Have Our AI Call You
                </button>
              </div>
            </div>
          </div>
        )}
        <PhoneCallModal 
          isOpen={isPhoneModalOpen}
          onClose={() => setIsPhoneModalOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;