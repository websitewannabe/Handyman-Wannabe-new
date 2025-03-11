
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

interface PackageCardDropdownProps {
  isOpen: boolean;
  packageData: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    features: string[];
    exclusions?: string[];
    popular?: boolean;
  };
}

const PackageCardDropdown: React.FC<PackageCardDropdownProps> = ({
  isOpen,
  packageData,
}) => {
  // Extract price without the dollar sign for calculation
  const basePrice = packageData.price.replace("$", "");
  const fourHourPrice = packageData.duration.includes("4 hours") 
    ? packageData.price 
    : `$${Math.round(parseInt(basePrice) / parseInt(packageData.duration.split(" ")[0]) * 4)}`;

  // Default exclusions if not provided
  const exclusions = packageData.exclusions || [
    "Materials cost (except as noted)",
    "Permits or inspection fees",
    "Major structural repairs",
    "Specialized tools rental"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-gray-50 border-t border-gray-200 w-full"
        >
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Price for 4 Hours</h3>
              <p className="text-2xl font-bold text-primary mb-6">{fourHourPrice}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Included Services</h3>
                <ul className="space-y-2">
                  {packageData.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Not Included</h3>
                <ul className="space-y-2">
                  {exclusions.map((exclusion, idx) => (
                    <li key={idx} className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{exclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-center">
              <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Book This Package
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PackageCardDropdown;
