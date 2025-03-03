
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

const MobileServicesPage = () => {
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
          onClick={() => navigate(-1)} 
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
                onClick={() => navigate(category.path)}
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
