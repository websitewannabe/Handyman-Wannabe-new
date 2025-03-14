import React, { useState } from "react";
import { motion } from "framer-motion";
//import { BiBuildingHouse, BiPaintRoll } from "react-icons/bi";
import {
  FaWrench,
  FaLightbulb,
  FaHammer,
  FaSnowflake,
  FaShieldAlt,
  FaDoorOpen,
  FaSwimmingPool,
  FaHome,
  FaTools,
  FaBroom,
  FaChevronDown,
  FaLock,
  FaTree,
  FaPaintBrush,
} from "react-icons/fa";
import { GiBoilers } from "react-icons/gi";
import { TbFence } from "react-icons/tb";
import { MdPlumbing, MdOutlineRoofing } from "react-icons/md";

const Services = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"interior" | "exterior">("interior");

  const interiorServices = [
    {
      icon: <FaWrench className="w-6 h-6" />,
      category: "Carpentry",
      description:
        "From cabinet installations to custom woodwork, we handle all your carpentry needs.",
      path: "/services/carpentry",
    },
    {
      icon: <MdPlumbing className="w-6 h-6" />,
      category: "Plumbing",
      description:
        "Professional plumbing services for repairs, installations, and maintenance.",
      path: "/services/plumbing",
    },
    {
      icon: <FaBroom className="w-6 h-6" />,
      category: "Cleaning",
      description: "Deep cleaning services for a spotless and healthy home.",
      path: "/services/cleaning",
    },
    {
      icon: <FaLightbulb className="w-6 h-6" />,
      category: "Holiday Lighting",
      description: "Festive lighting installation and removal services.",
      path: "/services/holiday-lighting",
    },
    {
      icon: <FaLock className="w-6 h-6" />,
      category: "Locksmithing",
      description: "Professional locksmith services for your security needs.",
      path: "/services/locksmithing",
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      category: "Home Security",
      description: "Comprehensive home security solutions and installations.",
      path: "/services/home-security",
    },
  ];

  const exteriorServices = [
    {
      icon: <FaPaintBrush className="w-6 h-6" />, // Changed icon here
      category: "Painting",
      description: "Professional painting services for a fresh look.",
      path: "/services/painting",
    },
    {
      icon: <MdOutlineRoofing className="w-6 h-6" />,
      category: "Roofing",
      description: "Expert roofing repairs and maintenance.",
      path: "/services/roofing",
    },
    {
      icon: <FaDoorOpen className="w-6 h-6" />,
      category: "Garage Doors",
      description: "Garage door installation and repair services.",
      path: "/services/garage-doors",
    },
    {
      icon: <TbFence className="w-6 h-6" />,
      category: "Fencing",
      description: "Quality fencing solutions for your property.",
      path: "/services/fencing",
    },
    {
      icon: <FaTree className="w-6 h-6" />,
      category: "Landscaping",
      description: "Professional landscaping and lawn care services.",
      path: "/services/landscaping",
    },
    {
      icon: <FaSwimmingPool className="w-6 h-6" />,
      category: "Pools & Spas",
      description: "Maintenance and repair for pools and spas.",
      path: "/services/pools-and-spas",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Interior Services Section */}
        <div className="relative">
          <div className="relative h-[300px] rounded-xl overflow-hidden mb-6">
            <img
              src="/images/interior.avif"
              alt="Interior Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white">Interior</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {interiorServices.map((service, index) => (
              <div key={service.category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gray-50 rounded-lg p-6 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-white rounded-full p-3 shadow-md group-hover:bg-primary group-hover:text-white transition-colors">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.category}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Exterior Services Section */}
        <div className="relative">
          <div className="relative h-[300px] rounded-xl overflow-hidden mb-6">
            <img
              src="/images/exterior.avif"
              alt="Exterior Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white">Exterior</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exteriorServices.map((service, index) => (
              <div key={service.category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gray-50 rounded-lg p-6 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-white rounded-full p-3 shadow-md group-hover:bg-primary group-hover:text-white transition-colors">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.category}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;