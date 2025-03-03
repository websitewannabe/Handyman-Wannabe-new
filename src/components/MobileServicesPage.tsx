
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

// Interface for service category item
interface ServiceItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

const MobileServicesPage: React.FC = () => {
  // Service categories from navbar with added paths
  const serviceCategories: ServiceItem[] = [
    { name: "Electrical", icon: Zap, path: "/electrical" },
    { name: "Plumbing", icon: Droplet, path: "/plumbing" },
    { name: "Painting & Drywall", icon: Paintbrush, path: "/painting-drywall" },
    { name: "Flooring", icon: Ruler, path: "/flooring" },
    { name: "Carpentry", icon: Hammer, path: "/carpentry" },
    { name: "Windows & Doors", icon: DoorOpen, path: "/windows-doors" },
    { name: "Garage Doors", icon: GarageDoor, path: "/garage-doors" },
    { name: "Powerwashing", icon: Waves, path: "/powerwashing" },
    { name: "Landscaping", icon: Flower2, path: "/landscaping" },
    { name: "Home Inspections", icon: ClipboardCheck, path: "/home-inspections" },
    { name: "Home Security", icon: Shield, path: "/home-security" },
    { name: "Smart Home", icon: SmartHome, path: "/smart-home" },
    { name: "Locksmithing", icon: Lock, path: "/locksmithing" },
    { name: "Pools & Spas", icon: Bath, path: "/pools-spas" },
    { name: "Holiday Lighting", icon: Lightbulb, path: "/holiday-lighting" },
    { name: "Furniture Assembly", icon: Sofa, path: "/furniture-assembly" },
    { name: "Third Party Moving", icon: Truck, path: "/third-party-moving" },
    { name: "Cleaning", icon: Brush, path: "/cleaning" },
    { name: "Property Management", icon: Building2, path: "/property-management" },
    { name: "Misc.", icon: Package, path: "/misc" },
  ];

  return (
    <div className="mobile-services-page">
      {/* Header with back button */}
      <header className="mobile-services-header">
        <Link to="/" className="back-button">
          <ArrowLeft />
          <span>Back</span>
        </Link>
        <h1>Our Services</h1>
      </header>

      {/* Services list */}
      <div className="mobile-services-list">
        {serviceCategories.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              key={index}
              to={service.path}
              className="mobile-service-item"
            >
              <div className="mobile-service-icon">
                <Icon size={24} />
              </div>
              <span className="mobile-service-name">{service.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileServicesPage;
