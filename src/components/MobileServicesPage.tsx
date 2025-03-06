
import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import icons used in the services mega menu
import { 
  Bath, 
  Lightbulb, 
  Wrench, 
  PaintBucket, 
  Tv, 
  Home, 
  Lock, 
  Flower2, 
  Wind,
  Droplets,
  SquareAsterisk,
  CalendarClock,
  Truck
} from "lucide-react";

interface MobileServicesPageProps {
  onClose?: () => void;
}

const MobileServicesPage = ({ onClose }: MobileServicesPageProps) => {
  const navigate = useNavigate();

  const serviceCategories = [
    {
      title: "Plumbing",
      icon: Bath,
      path: "/plumbing",
      description: "Leak repairs, fixture installations, and drain cleaning"
    },
    {
      title: "Electrical",
      icon: Lightbulb,
      path: "/electrical",
      description: "Wiring, lighting, and electrical repairs"
    },
    {
      title: "General Repairs",
      icon: Wrench,
      path: "/general-repairs",
      description: "Handyman services for various home repairs"
    },
    {
      title: "Painting & Drywall",
      icon: PaintBucket,
      path: "/painting-drywall",
      description: "Interior and exterior painting, drywall repair"
    },
    {
      title: "Smart Homes",
      icon: Tv,
      path: "/smart-homes",
      description: "Smart device installation and configuration"
    },
    {
      title: "Windows & Doors",
      icon: Home,
      path: "/windows-doors",
      description: "Window and door installation and repair"
    },
    {
      title: "Locksmithing",
      icon: Lock,
      path: "/locksmithing",
      description: "Lock installation, repair, and key duplication"
    },
    {
      title: "Landscaping",
      icon: Flower2,
      path: "/landscaping",
      description: "Lawn care, garden maintenance, and landscaping"
    },
    {
      title: "HVAC",
      icon: Wind,
      path: "/hvac",
      description: "Heating, ventilation, and air conditioning services"
    },
    {
      title: "Powerwashing",
      icon: Droplets,
      path: "/powerwashing",
      description: "Surface cleaning for decks, driveways, and exteriors"
    },
    {
      title: "Holiday Lighting",
      icon: SquareAsterisk,
      path: "/holiday-lighting",
      description: "Holiday light installation and removal"
    },
    {
      title: "Cleaning",
      icon: Droplets,
      path: "/cleaning",
      description: "Deep cleaning, sanitizing, and organization services"
    },
    {
      title: "Third Party Moving",
      icon: Truck,
      path: "/third-party-moving",
      description: "Professional packing, loading, and moving services"
    },
    {
      title: "Home Security",
      icon: Lock,
      path: "/home-security",
      description: "Security system installation and maintenance"
    },
    {
      title: "Special Events",
      icon: CalendarClock,
      path: "/special-events",
      description: "Setup and decoration for special occasions"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header with back button */}
      <div className="sticky top-0 bg-primary text-white px-4 py-3 flex items-center z-10">
        <button 
          onClick={onClose || (() => navigate(-1))} 
          className="mr-4 p-1 rounded-full hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Services</h1>
      </div>

      {/* Service categories list */}
      <div className="py-4 px-3">
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
          {serviceCategories.map((category, index) => (
            <div 
              key={index}
              className={`border-b border-gray-200 ${index === serviceCategories.length - 1 ? 'border-b-0' : ''}`}
            >
              <button
                onClick={() => {
                  navigate(category.path);
                  if (onClose) onClose();
                }}
                className="w-full text-left px-4 py-5 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-lg mr-4">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Contact section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4 text-center shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">Contact our specialists for custom service solutions</p>
          <button className="bg-secondary text-white py-2 px-6 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileServicesPage;
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
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
} from "lucide-react";

// Service categories data structure matching the Navbar's
const serviceCategories = [
  {
    items: [
      { name: "Carpentry", icon: Hammer, path: "/services/carpentry" },
      { name: "Cleaning", icon: Brush, path: "/services/cleaning" },
      { name: "Electrical", icon: Zap, path: "/services/electrical" },
      { name: "Flooring", icon: Ruler, path: "/services/flooring" },
      { name: "Furniture Assembly", icon: Sofa, path: "/services/furniture-assembly" },
      { name: "Garage Doors", icon: GarageDoor, path: "/services/garage-doors" },
      { name: "Holiday Lighting", icon: Lightbulb, path: "/services/holiday-lighting" },
      { name: "Home Inspections", icon: ClipboardCheck, path: "/services/home-inspections" },
      { name: "Home Security", icon: Shield, path: "/services/home-security" },
      { name: "Landscaping", icon: Flower2, path: "/services/landscaping" },
    ],
  },
  {
    items: [
      { name: "Locksmithing", icon: Lock, path: "/services/locksmithing" },
      { name: "Misc.", icon: Package, path: "/services/misc" },
      { name: "Painting & Drywall", icon: Paintbrush, path: "/services/painting-drywall" },
      { name: "Plumbing", icon: Droplet, path: "/services/plumbing" },
      { name: "Pools & Spas", icon: Bath, path: "/services/pools-spas" },
      { name: "Powerwashing", icon: Waves, path: "/services/powerwashing" },
      { name: "Property Management", icon: Building2, path: "/services/management-companies" },
      { name: "Smart Home", icon: SmartHome, path: "/services/smart-homes" },
      { name: "Third Party Moving", icon: Truck, path: "/services/third-party-moving" },
      { name: "Windows & Doors", icon: DoorOpen, path: "/services/windows-doors" },
    ],
  },
];

interface MobileServicesPageProps {
  onClose: () => void;
}

const MobileServicesPage: React.FC<MobileServicesPageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white z-10">
        <h1 className="text-xl font-bold">Services</h1>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Close services page"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="p-4">
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              {category.items.map((service, serviceIndex) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={serviceIndex}
                    to={service.path}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
                    onClick={onClose}
                  >
                    <div className="w-12 h-12 mb-2 flex items-center justify-center text-primary">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-center text-sm font-medium">{service.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="mt-8 mb-16">
          <Link
            to="/service-directory"
            className="block w-full py-3 text-center bg-primary text-white font-bold rounded-lg"
            onClick={onClose}
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileServicesPage;
