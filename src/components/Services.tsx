
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

// Service data with icons
const services = [
  {
    category: "Interior Services",
    items: [
      {
        name: "Electrical",
        icon: "⚡",
        time: "1-2 hours",
        link: "/services/electrical",
      },
      {
        name: "Plumbing",
        icon: "💧",
        time: "30-60 mins",
        link: "/services/plumbing",
      },
      {
        name: "Carpentry",
        icon: "🔨",
        time: "4-6 hours",
        link: "/services/carpentry",
      },
      {
        name: "Smart Home",
        icon: "🏠",
        time: "2-3 hours",
        link: "/services/smart-home",
      },
      {
        name: "Painting & Drywall",
        icon: "🖌️",
        time: "1-2 hours",
        link: "/services/painting-drywall",
      },
      {
        name: "Flooring",
        icon: "🪵",
        time: "1-2 hours",
        link: "/services/flooring",
      },
      {
        name: "Home Security",
        icon: "🔒",
        time: "1-3 hours",
        link: "/services/home-security",
      },
      {
        name: "Furniture Assembly",
        icon: "🪑",
        time: "2-4 hours",
        link: "/services/furniture-assembly",
      },
    ],
  },
  {
    category: "Exterior Services",
    items: [
      {
        name: "Landscaping",
        icon: "🌱",
        time: "3-5 hours",
        link: "/services/landscaping",
      },
      {
        name: "Powerwashing",
        icon: "💦",
        time: "1-3 hours",
        link: "/services/powerwashing",
      },
      {
        name: "Gutter Cleaning",
        icon: "🏠",
        time: "2-4 hours",
        link: "/services/gutter-cleaning",
      },
      {
        name: "Deck & Patio",
        icon: "🪑",
        time: "5-8 hours",
        link: "/services/deck-patio",
      },
    ],
  },
  {
    category: "Specialty Services",
    items: [
      {
        name: "Moving Assistance",
        icon: "📦",
        time: "2-4 hours",
        link: "/services/moving-assistance",
      },
      {
        name: "TV Mounting",
        icon: "📺",
        time: "1-2 hours",
        link: "/services/tv-mounting",
      },
      {
        name: "Holiday Decorations",
        icon: "🎄",
        time: "3-6 hours",
        link: "/services/holiday-decorations",
      },
      {
        name: "Pest Control",
        icon: "🐜",
        time: "1-2 hours",
        link: "/services/pest-control",
      },
    ],
  },
];

const ServiceSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            From quick fixes to comprehensive renovation projects, our skilled
            handyman team is ready to tackle any job with precision and care.
          </p>
        </div>

        {/* Service Categories */}
        <div className="max-w-4xl mx-auto space-y-4">
          {services.map((service) => (
            <div key={service.category} className="rounded-lg overflow-hidden">
              <button
                className={`w-full px-6 py-4 text-left font-semibold text-lg flex items-center justify-between ${
                  selectedCategory === service.category
                    ? "bg-primary text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                } transition-colors duration-300 shadow-sm`}
                onClick={() => toggleCategory(service.category)}
              >
                <span>{service.category}</span>
                {selectedCategory === service.category ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {/* Service Details Dropdown */}
              <AnimatePresence>
                {selectedCategory === service.category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white border-t border-gray-100 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.items.map((item) => (
                          <div
                            key={item.name}
                            className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-3xl">{item.icon}</div>
                              <div className="text-sm text-green-600 font-medium">
                                {item.time}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800">
                              {item.name}
                            </h3>
                            <Link
                              to={item.link}
                              className="block w-full text-center bg-white border-2 border-primary text-primary font-medium py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors"
                            >
                              Learn more about {item.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
