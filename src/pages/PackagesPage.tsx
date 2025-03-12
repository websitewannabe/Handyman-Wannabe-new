
import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Star, ChevronRight } from "lucide-react";
import CustomQuoteModal from "../components/CustomQuoteModal";
import SEO from "../components/SEO";

// Package data
const packageData = [
  {
    id: "basic",
    name: "Basic Handyman Package",
    description: "Essential services for minor home repairs and maintenance.",
    price: "$399",
    duration: "4 hours",
    features: [
      "Carpentry",
      "Electrical",
      "Furniture Assembly",
      "Garage Doors",
      "Holiday Lighting",
      "Home Inspections",
      "Home Security",
      "Locksmithing",
      "Painting & Drywall",
      "Plumbing",
      "Pools & Spas",
      "Smart Home",
      "Windows & Doors",
    ],
    exclusions: [
      "Cleaning",
      "Flooring",
      "Home Inspections",
      "Power Washing",
      "Landscaping",
    ],
    popular: false,
  },
  {
    id: "standard",
    name: "Standard Home Maintenance Package",
    description:
      "Comprehensive service package for regular home maintenance and improvements.",
    price: "$799",
    duration: "8 hours",
    features: [
      "Carpentry",
      "Electrical",
      "Flooring",
      "Furniture Assembly",
      "Garage Doors",
      "Holiday Lighting",
      "Home Inspections",
      "Home Security",
      "Locksmithing",
      "Landscaping",
      "Painting & Drywall",
      "Plumbing",
      "Pools & Spas",
      "Smart Home",
      "Windows & Doors",
    ],
    exclusions: ["Cleaning", "Home Inspections", "Power Washing"],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Home Improvement Package",
    description:
      "Complete home improvement services with priority scheduling and dedicated support.",
    price: "$1599",
    duration: "16 hours",
    features: [
      "Carpentry",
      "Cleaning",
      "Electrical",
      "Flooring",
      "Furniture Assembly",
      "Garage Doors",
      "Holiday Lighting",
      "Home Inspections",
      "Home Security",
      "Locksmithing",
      "Landscaping",
      "Painting & Drywall",
      "Plumbing",
      "Pools & Spas",
      "Power Washing",
      "Smart Home",
      "Windows & Doors",
    ],
    exclusions: ["Home Inspections"],
    popular: false,
  },
];

// Animation variants
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const PackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<(typeof packageData)[0] | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Using useCallback to memoize functions and preserve scroll position
  const selectPackage = useCallback((pkg: (typeof packageData)[0]) => {
    // Only update if actually changing to prevent unnecessary renders
    if (pkg.id !== selectedPackage?.id) {
      const scrollPosition = window.scrollY;
      setSelectedPackage(pkg);
      // Restore scroll position after state update
      requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
    }
  }, [selectedPackage]);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
  }, []);

  const openQuoteModal = useCallback(() => {
    // Preserve scroll position when opening modal
    const scrollPosition = window.scrollY;
    setIsQuoteModalOpen(true);
    // Restore scroll position after modal opens
    setTimeout(() => window.scrollTo(0, scrollPosition), 0);
  }, []);

  // Default to the first package if none selected - only run once on mount
  React.useEffect(() => {
    if (!selectedPackage && packageData.length > 0) {
      setSelectedPackage(packageData[0]);
    }
  }, [selectedPackage]); // Add dependency to prevent continuous re-rendering

  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Service Packages - Handyman Wannabe"
        description="Choose from our selection of pre-designed service packages that combine our most popular services at discounted rates. Our current service rate is $250 for the first hour and additional $125 for each additional hour."
        keywords="handyman packages, home maintenance package, home repair bundle, service packages"
        featuredImage="/images/packages-banner.jpg"
      />

      <div className="container mx-auto px-4">
        <motion.div {...fadeInVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Service Packages</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our selection of pre-designed service packages that
            combine our most popular services at discounted rates. Our current
            service rate is $250 for the first hour and additional $125 for each
            additional hour.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left side - Package cards */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {packageData.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  className={`relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    selectedPackage?.id === pkg.id ? "ring-2 ring-primary" : ""
                  } ${pkg.popular ? "ring-2 ring-primary" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => selectPackage(pkg)}
                >
                  {pkg.popular && (
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Most Popular
                    </div>
                  )}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={`/images/${pkg.id}-package.jpeg`}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/home-Keys.avif"; // Fallback image
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h2 className="text-xl font-bold">{pkg.name}</h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {pkg.price}
                        </span>
                        <span className="text-gray-500 ml-2">/{pkg.duration}</span>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-primary transition-transform ${selectedPackage?.id === pkg.id ? 'rotate-90' : ''}`} />
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{pkg.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right side - Package details */}
          <div className="lg:w-2/3">
            {selectedPackage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg p-6"
              >
                <div className="border-b pb-6 mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedPackage.name}</h2>
                  <p className="text-lg text-gray-600 mb-4">{selectedPackage.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-primary/10 rounded-lg p-4 flex-1">
                      <p className="text-gray-600 text-sm mb-1">Price</p>
                      <p className="text-3xl font-bold text-primary">{selectedPackage.price}</p>
                      <p className="text-gray-500">for {selectedPackage.duration}</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 flex-1">
                      <p className="text-gray-600 text-sm mb-1">Price for 4 Hours</p>
                      <p className="text-3xl font-bold text-primary">
                        {selectedPackage.duration.includes("4 hours") 
                          ? selectedPackage.price 
                          : `$${Math.round(parseInt(selectedPackage.price.replace("$", "")) / parseInt(selectedPackage.duration.split(" ")[0]) * 4)}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Included Services</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      {selectedPackage.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Not Included</h3>
                    <ul className="space-y-2">
                      {selectedPackage.exclusions.map((exclusion, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-500 mr-2 font-bold">✕</span>
                          <span className="text-gray-700">{exclusion}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Materials & Supplies</h3>
                      <p className="text-gray-600 mb-2">
                        Basic materials are included in all packages. Specialized materials or supplies 
                        that exceed $50 will be quoted separately before work begins.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                    Book This Package
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          {...fadeInVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Need a Custom Package?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            We can create a personalized service package tailored to your
            specific home improvement needs.
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
        <CustomQuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
      )}
    </div>
  );
};

export default React.memo(PackagesPage);
