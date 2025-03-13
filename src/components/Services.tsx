import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Wrench,
  Paintbrush,
  Zap,
  Droplet,
  Hammer,
  Ruler,
  Scissors,
  Shovel,
  Lightbulb,
  Power,
  Plug,
  Fan,
  BookOpen,
  DoorOpen,
  PenTool as Tool,
  Sofa,
  Lock,
  Home,
  Shield,
  Waves,
  Car,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    category: "Interior",
    image: "/images/Wood-and-Drill.avif",
    items: [
      { name: "Electrical", time: "1-2 hours", icon: Zap },
      { name: "Plumbing", time: "30-60 mins", icon: Droplet },
      { name: "Carpentry", time: "4-6 hours", icon: Hammer },
      { name: "Smart Home", time: "2-3 hours", icon: Home },
      { name: "Painting & Drywall", time: "1-2 hours", icon: Paintbrush },
      { name: "Flooring", time: "1-2 hours", icon: Ruler },
      { name: "Home Security", time: "1-3 hours", icon: Shield },
      { name: "Furniture Assembly", time: "2-4 hours", icon: Sofa },
    ],
  },
  {
    category: "Exterior",
    image: "/images/Drill.avif",
    items: [
      { name: "Windows & Doors", time: "2-4 hours", icon: DoorOpen },
      { name: "Garage Doors", time: "3-4 hours", icon: Car },
      { name: "Landscaping", time: "1-3 hours", icon: Shovel },
      { name: "Powerwashing", time: "1-2 hours", icon: Waves },
      { name: "Pools & Spas", time: "2-3 hours", icon: Droplet },
      { name: "Holiday Lighting", time: "4-6 hours", icon: Lightbulb },
      { name: "Locksmithing", time: "3-4 hours", icon: Lock },
      { name: "Property Management", time: "1-2 hours", icon: Tool },
    ],
  },
];

const getServiceUrl = (name: string) => {
  // Convert service name to URL-friendly format
  const slug = name
    .toLowerCase()
    .replace(/\s+&\s+|-/g, "-")
    .replace(/\s+/g, "-");
  return `/services/${slug}`;
};

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Interior");
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <h2 className="text-center mb-12">Our Services</h2>

      <div className="flex flex-wrap">
        {services.map((service) => (
          <div
            key={service.category}
            className="w-full md:w-1/2 relative cursor-pointer group"
            onClick={() => setSelectedCategory(service.category)}
            onMouseEnter={() => setHoveredService(service.category)}
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="relative h-[400px] overflow-hidden">
              {/* Image with overlay */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"></div>
              </div>

              {/* Category label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{service.category}</h3>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-300 ${
                      selectedCategory === service.category ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{
                  opacity: hoveredService === service.category ? 1 : 0,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Service Details Dropdown */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-6">
                    {selectedCategory} Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services
                      .find((s) => s.category === selectedCategory)
                      ?.items.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-all duration-300 hover:shadow-lg h-[76px] flex items-center" //Added h-[76px] and flex items-center
                        >
                          <div className="mr-4 bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0"> {/* Added flex-shrink-0 */}
                            <item.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-grow min-w-0"> {/* Added min-w-0 */}
                            <h4 className="font-bold text-[#1B4332] group-hover:text-primary transition-colors truncate"> {/* Added truncate */}
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">{item.time}</p>
                          </div>
                          <div className="flex-shrink-0"> {/* Added flex-shrink-0 and changed class */}
                            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;