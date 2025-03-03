
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

interface ServiceCategoryProps {
  name: string;
  icon: React.ElementType;
  href: string;
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({ name, icon: Icon, href }) => {
  return (
    <Link 
      to={href} 
      className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100"
    >
      <div className="bg-primary/10 rounded-full p-3 mr-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="text-lg font-medium">{name}</span>
    </Link>
  );
};

interface MobileServicesPageProps {
  onClose: () => void;
}

const MobileServicesPage: React.FC<MobileServicesPageProps> = ({ onClose }) => {
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
    { name: "Property Management", icon: Building2, href: "/services/property-management" },
    { name: "Misc.", icon: Package, href: "/services/misc" },
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center p-4">
          <button 
            onClick={onClose} 
            className="p-2 -ml-2 mr-2 rounded-full hover:bg-gray-100"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Services</h1>
        </div>
      </div>
      
      <div className="pb-20">
        {serviceCategories.map((category, index) => (
          <ServiceCategory 
            key={index}
            name={category.name}
            icon={category.icon}
            href={category.href}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileServicesPage;
