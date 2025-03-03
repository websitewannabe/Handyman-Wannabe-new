
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
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
  Package
} from 'lucide-react';

const serviceCategories = [
  { name: "Electrical", icon: Zap, href: "/services/electrical" },
  { name: "Plumbing", icon: Droplet, href: "/services/plumbing" },
  { name: "Painting & Drywall", icon: Paintbrush, href: "/services/painting-drywall" },
  { name: "Flooring", icon: Ruler, href: "/services/flooring" },
  { name: "Carpentry", icon: Hammer, href: "/services/carpentry" },
  { name: "Windows & Doors", icon: DoorOpen, href: "/services/windows-doors" },
  { name: "Garage Doors", icon: GarageDoor, href: "/services/garage-doors" },
  { name: "Powerwashing", icon: Waves, href: "/services/powerwashing" },
  { name: "Landscaping", icon: Flower2, href: "/services/landscaping" },
  { name: "Home Inspections", icon: ClipboardCheck, href: "/services/home-inspections" },
  { name: "Home Security", icon: Shield, href: "/services/home-security" },
  { name: "Smart Home", icon: SmartHome, href: "/services/smart-homes" },
  { name: "Locksmithing", icon: Lock, href: "/services/locksmithing" },
  { name: "Pools & Spas", icon: Bath, href: "/services/pools-spas" },
  { name: "Holiday Lighting", icon: Lightbulb, href: "/services/holiday-lighting" },
  { name: "Furniture Assembly", icon: Sofa, href: "/services/furniture-assembly" },
  { name: "Third Party Moving", icon: Truck, href: "/services/third-party-moving" },
  { name: "Cleaning", icon: Brush, href: "/services/cleaning" },
  { name: "Property Management", icon: Building2, href: "/services/management-companies" },
  { name: "Misc.", icon: Package, href: "/services/misc" },
];

const MobileServicesPage = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const handleServiceClick = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <div className="mobile-services-page fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="flex items-center px-4 py-3 border-b">
          <button 
            onClick={onClose}
            className="mr-4 text-gray-700 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Services</h1>
        </div>
      </div>
      
      <div className="p-4">
        <ul className="space-y-1">
          {serviceCategories.map((service, index) => (
            <li key={index}>
              <button
                onClick={() => handleServiceClick(service.href)}
                className="w-full flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-8 h-8 mr-4 flex items-center justify-center text-primary">
                  <service.icon className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">{service.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileServicesPage;
