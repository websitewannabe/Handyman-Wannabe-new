import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import CustomQuoteModal from "../components/CustomQuoteModal";
import PackageCardDropdown from "../components/PackageCardDropdown";

// Package data - moved to top level to prevent re-creation on renders
const packageData = [
  {
    id: "basic",
    name: "Basic Handyman Package",
    description: "Essential services for minor home repairs and maintenance.",
    price: "$199",
    duration: "4 hours",
    features: [
      "Minor plumbing repairs",
      "Light fixture installation",
      "Furniture assembly",
      "Door/cabinet adjustments",
      "TV mounting",
      "Small drywall repairs"
    ],
    popular: false
  },
  {
    id: "standard",
    name: "Standard Home Maintenance Package",
    description: "Comprehensive service package for regular home maintenance and improvements.",
    price: "$349",
    duration: "8 hours",
    features: [
      "All Basic Package services",
      "Deck/fence repairs",
      "Ceiling fan installation",
      "Painting (small areas)",
      "Toilet replacement",
      "Garbage disposal installation",
      "Weatherstripping & caulking"
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Premium Home Improvement Package",
    description: "Complete home improvement services with priority scheduling and dedicated support.",
    price: "$599",
    duration: "16 hours",
    features: [
      "All Standard Package services",
      "Priority scheduling",
      "Custom shelving installation",
      "Smart home device setup",
      "Interior trim work",
      "Major appliance installation",
      "Complete bathroom updates",
      "24/7 emergency support"
    ],
    popular: false
  }
];

// Define fade-in animation variants
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const PackagesPage = () => {
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
  }, []);

  const openQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(true);
  }, []);

  // Toggle package dropdown
  const togglePackageDropdown = useCallback((packageId: string) => {
    setExpandedPackageId(prevId => prevId === packageId ? null : packageId);
  }, []);

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          {...fadeInVariants}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Service Packages</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our selection of pre-designed service packages that combine our most popular services at discounted rates.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {packageData.map((pkg) => (
            <motion.div
              key={pkg.id}
              {...fadeInVariants}
              transition={{ duration: 0.5, delay: packageData.indexOf(pkg) * 0.1 }}
            >
              <PackageCardDropdown
                pkg={pkg}
                isExpanded={expandedPackageId === pkg.id}
                onToggle={() => togglePackageDropdown(pkg.id)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeInVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Need a Custom Package?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            We can create a personalized service package tailored to your specific home improvement needs.
          </p>
          <button
            onClick={openQuoteModal}
            className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Request a Custom Quote
          </button>
        </motion.div>
      </div>

      {/* Custom Quote Modal - Only render when needed */}
      {isQuoteModalOpen && (
        <CustomQuoteModal 
          isOpen={isQuoteModalOpen} 
          onClose={closeQuoteModal} 
        />
      )}
    </div>
  );
};

export default React.memo(PackagesPage);