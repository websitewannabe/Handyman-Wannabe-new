
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
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
  ArrowLeft,
  ChevronRight
} from "lucide-react";

interface MobileServicesPageProps {
  onClose?: () => void;
}

const MobileServicesPage = ({ onClose }: MobileServicesPageProps) => {
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      name: "Electrical",
      icon: <Zap className="w-6 h-6" />,
      path: "/services/electrical",
      description: "Lighting installations, outlet repairs, and more",
    },
    {
      name: "Plumbing",
      icon: <Droplet className="w-6 h-6" />,
      path: "/services/plumbing",
      description: "Fixture replacements, leak repairs, and drain cleaning",
    },
    {
      name: "Painting & Drywall",
      icon: <Paintbrush className="w-6 h-6" />,
      path: "/services/painting-drywall",
      description: "Interior painting, drywall repair, and texturing",
    },
    {
      name: "Carpentry",
      icon: <Ruler className="w-6 h-6" />,
      path: "/services/carpentry",
      description: "Custom shelving, trim work, and furniture assembly",
    },
    {
      name: "Handyman",
      icon: <Hammer className="w-6 h-6" />,
      path: "/services/handyman",
      description: "General repairs, mounting, and maintenance tasks",
    },
    {
      name: "Windows & Doors",
      icon: <DoorOpen className="w-6 h-6" />,
      path: "/services/windows-doors",
      description: "Installation, repair, and weatherproofing",
    },
    {
      name: "Garage Doors",
      icon: <GarageDoor className="w-6 h-6" />,
      path: "/services/garage-doors",
      description: "Opener installation, track repair, and maintenance",
    },
    {
      name: "Power Washing",
      icon: <Waves className="w-6 h-6" />,
      path: "/services/powerwashing",
      description: "Exterior cleaning for siding, decks, and driveways",
    },
    {
      name: "Lawn & Garden",
      icon: <Flower2 className="w-6 h-6" />,
      path: "/services/lawn-garden",
      description: "Landscaping, lawn care, and garden maintenance",
    },
    {
      name: "Home Inspections",
      icon: <ClipboardCheck className="w-6 h-6" />,
      path: "/services/home-inspections",
      description: "Thorough evaluations of home systems and structure",
    },
    {
      name: "Holiday Lighting",
      icon: <Lightbulb className="w-6 h-6" />,
      path: "/services/holiday-lighting",
      description: "Professional holiday light installation and removal",
    },
    {
      name: "Flooring",
      icon: <Sofa className="w-6 h-6" />,
      path: "/services/flooring",
      description: "Installation and repair for various flooring types",
    },
    {
      name: "Third Party Moving",
      icon: <Truck className="w-6 h-6" />,
      path: "/services/third-party-moving",
      description: "Furniture delivery, moving assistance, and more",
    },
    {
      name: "Cleaning",
      icon: <Brush className="w-6 h-6" />,
      path: "/services/cleaning",
      description: "Deep cleaning, move-in/out services, and maintenance",
    },
    {
      name: "Management Companies",
      icon: <Building2 className="w-6 h-6" />,
      path: "/services/management-companies",
      description: "Property management and maintenance solutions",
    },
    {
      name: "Misc Services",
      icon: <Package className="w-6 h-6" />,
      path: "/services/misc",
      description: "Additional services not covered in other categories",
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  // Add class to body to prevent scrolling
  React.useEffect(() => {
    document.body.classList.add('mobile-menu-open');
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
        <button
          onClick={onClose}
          className="flex items-center text-gray-700 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-xl font-bold text-center">Our Services</h1>
        <div className="w-5"></div> {/* Empty div for spacing */}
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <p className="text-gray-600 mb-6 text-center">
          Select a service category to explore our offerings
        </p>
        
        <div className="divide-y">
          {serviceCategories.map((category, index) => (
            <button
              key={index}
              className="w-full py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => handleNavigate(category.path)}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                  {category.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
        
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-center mb-2">Need help deciding?</h3>
          <p className="text-center text-gray-600 mb-3">
            Not sure which service you need? Contact us for a consultation.
          </p>
          <button 
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            onClick={() => navigate('/contact')}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileServicesPage;
