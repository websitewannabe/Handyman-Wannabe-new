
import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Star, ChevronDown, ChevronUp } from "lucide-react";
import CustomQuoteModal from "../components/CustomQuoteModal";
import PackageCardDropdown from "../components/PackageCardDropdown";
import SEO from "../components/SEO";

// Package data
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
    exclusions: [
      "Materials cost (except as noted)",
      "Permits or inspection fees",
      "Major structural repairs",
      "Electrical panel work"
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
    exclusions: [
      "Materials cost (except as noted)",
      "Permits or inspection fees",
      "Major structural repairs",
      "Specialized tools rental"
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
    exclusions: [
      "Materials cost (except as noted)",
      "Permits or inspection fees",
      "Structural modifications",
      "Roof repairs"
    ],
    popular: false
  }
];

// Animation variants
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// PackageCard component
const PackageCard = ({ 
  pkg, 
  isExpanded,
  toggleExpand 
}: { 
  pkg: typeof packageData[0], 
  isExpanded: boolean,
  toggleExpand: (id: string) => void
}) => {
  return (
    <div className="flex flex-col">
      <motion.div
        className={`relative bg-white rounded-xl overflow-hidden shadow-lg ${
          isExpanded ? 'rounded-b-none shadow-md' : 'hover:shadow-xl'
        } transition-all duration-300 ${
          pkg.popular ? "ring-2 ring-primary" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {pkg.popular && (
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Star className="w-4 h-4 mr-1 fill-current" />
            Most Popular
          </div>
        )}
        <div className="relative h-48 overflow-hidden">
          <img
            src={`/images/${pkg.id}-package.jpg`}
            alt={pkg.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/home-Keys.avif"; // Fallback image
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-1">{pkg.name}</h2>
            <p className="text-white/90">{pkg.description}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-3xl font-bold text-primary">
                {pkg.price}
              </span>
              <span className="text-gray-500 ml-2">/{pkg.duration}</span>
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            {pkg.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-600">
                <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
            {pkg.features.length > 4 && (
              <li className="text-gray-500 italic text-sm">
                +{pkg.features.length - 4} more features
              </li>
            )}
          </ul>

          <button 
            onClick={() => toggleExpand(pkg.id)}
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors flex justify-center items-center"
            aria-expanded={isExpanded}
            aria-controls={`dropdown-${pkg.id}`}
          >
            {isExpanded ? (
              <>Hide Details <ChevronUp className="ml-2 w-5 h-5" /></>
            ) : (
              <>View Details <ChevronDown className="ml-2 w-5 h-5" /></>
            )}
          </button>
        </div>
      </motion.div>
      
      <div 
        id={`dropdown-${pkg.id}`}
        className={`rounded-b-xl overflow-hidden ${isExpanded ? 'shadow-lg' : ''}`}
      >
        <PackageCardDropdown
          isOpen={isExpanded}
          packageData={pkg}
        />
      </div>
    </div>
  );
};

const PackagesPage = () => {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  
  // Using useCallback to memoize functions
  const toggleExpand = useCallback((id: string) => {
    setExpandedPackage(prev => prev === id ? null : id);
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
        isExpanded={expandedPackage === pkg.id}
        toggleExpand={toggleExpand}
      />
    ));
  }, [expandedPackage, toggleExpand]);

  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Service Packages - Handyman Wannabe"
        description="Choose from our selection of pre-designed service packages that combine our most popular services at discounted rates."
        keywords="handyman packages, home maintenance package, home repair bundle, service packages"
        featuredImage="/images/packages-banner.jpg"
      />
      
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
