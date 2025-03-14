import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/services";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1B4332] mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional home services tailored to your needs. Select a category to explore our offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((category) => (
            <motion.div
              key={category.category}
              className={`group cursor-pointer rounded-xl shadow-sm transition-all duration-300 ${
                selectedCategory === category.category
                  ? "bg-primary text-white ring-2 ring-primary"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleCategoryClick(category.category)}
              whileHover={{ y: -4 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${
                    selectedCategory === category.category ? "text-white" : "text-[#1B4332]"
                  }`}>
                    {category.category}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      selectedCategory === category.category ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <p className={`text-sm ${
                  selectedCategory === category.category ? "text-white/90" : "text-gray-600"
                }`}>
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-6xl mx-auto">
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services
                      .find((s) => s.category === selectedCategory)
                      ?.items.map((service, index) => (
                        <motion.div
                          key={service.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group bg-gray-50 rounded-xl p-6 hover:bg-primary/5 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-lg font-semibold text-[#1B4332]">
                              {service.name}
                            </h4>
                            {service.popular && (
                              <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2 text-primary" />
                              <span className="text-sm">{service.duration}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <DollarSign className="w-4 h-4 mr-2 text-primary" />
                              <span className="text-sm">{service.price}</span>
                            </div>
                          </div>

                          <Link
                            to={`/services/${service.slug}`}
                            className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors"
                          >
                            Learn More
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;