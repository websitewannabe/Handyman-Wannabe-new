
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";

interface PackageCardDropdownProps {
  pkg: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    features: string[];
    popular?: boolean;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

const PackageCardDropdown: React.FC<PackageCardDropdownProps> = ({
  pkg,
  isExpanded,
  onToggle,
}) => {
  // Create a list of services not included - this is for demonstration purposes
  // In a real application, this would come from your data source
  const notIncludedServices = [
    "Custom carpentry work",
    "Major electrical rewiring",
    "Structural repairs",
    "Roof replacement",
    "Foundation work"
  ];

  // Extract price without the $ for calculations
  const priceNumber = parseInt(pkg.price.replace("$", ""));
  
  // Calculate price for four hours (assuming duration is in the format "X hours")
  const hourlyRate = priceNumber / parseInt(pkg.duration.split(" ")[0]);
  const fourHourPrice = Math.round(hourlyRate * 4);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative p-6">
        {pkg.popular && (
          <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 font-semibold">
            Popular
          </div>
        )}
        <h3 className="text-2xl font-bold">{pkg.name}</h3>
        <p className="text-gray-600 mt-2">{pkg.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold">{pkg.price}</span>
            <span className="text-gray-500 ml-2">/ {pkg.duration}</span>
          </div>
          <button
            onClick={onToggle}
            className="flex items-center bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            aria-expanded={isExpanded}
            aria-controls={`details-${pkg.id}`}
          >
            <span className="mr-2">View Details</span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`details-${pkg.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <h4 className="text-lg font-bold mb-3">Price for 4 Hours</h4>
              <p className="text-2xl font-bold text-primary mb-6">${fourHourPrice}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3">Included Services</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-3">Not Included Services</h4>
                <ul className="space-y-2">
                  {notIncludedServices.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full">
                  Book This Package
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackageCardDropdown;
