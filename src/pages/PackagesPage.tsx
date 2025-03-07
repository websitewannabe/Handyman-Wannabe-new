
import React, { useState, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import PackageModal from "../components/PackageModal";
import CustomQuoteModal from "../components/CustomQuoteModal";

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

// Animation variants - defined outside component to prevent recreating on each render
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Extracted PackageCard component for better reusability and memoization
const PackageCard = React.memo(({ pkg, openModal }) => {
  const { id, name, description, price, duration, features, popular } = pkg;
  
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-xl overflow-hidden ${
        popular ? "border-2 border-primary" : ""
      }`}
      {...fadeInVariants}
      transition={{ duration: 0.5, delay: id === "standard" ? 0.2 : id === "premium" ? 0.4 : 0 }}
    >
      {popular && (
        <div className="bg-primary text-white py-1 px-4 text-center">
          <span className="text-sm font-bold">MOST POPULAR</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-bold text-primary">{price}</span>
          <span className="text-gray-500 ml-2">/ {duration}</span>
        </div>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button 
          onClick={() => openModal(pkg)}
          className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
});

const PackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  
  // Using useCallback to memoize functions
  const openPackageModal = useCallback((pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
  }, []);
  
  const openQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(true);
  }, []);

  // Memoize the package cards to prevent unnecessary re-renders
  const packageCards = useMemo(() => {
    return packageData.map((pkg) => (
      <PackageCard 
        key={pkg.id} 
        pkg={pkg} 
        openModal={openPackageModal}
      />
    ));
  }, [openPackageModal]);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packageCards}
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

      {/* Package Modal - Only render when needed */}
      {isModalOpen && selectedPackage && (
        <PackageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          packageData={selectedPackage}
        />
      )}

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
