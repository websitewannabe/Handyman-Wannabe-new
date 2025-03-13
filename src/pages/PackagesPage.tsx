
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, ChevronRight, ChevronDown, Search, X, Filter, Grid, Table } from "lucide-react";
import CustomQuoteModal from "../components/CustomQuoteModal";
import SEO from "../components/SEO";

// Expanded package data with more packages and categories
const packageData = [
  {
    id: "basic",
    name: "Basic Handyman Package",
    description: "Essential services for minor home repairs and maintenance.",
    price: "$399",
    duration: "4 hours",
    category: "Essential",
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
    image: "/images/basic-package.jpeg",
  },
  {
    id: "standard",
    name: "Standard Home Maintenance Package",
    description:
      "Comprehensive service package for regular home maintenance and improvements.",
    price: "$799",
    duration: "8 hours",
    category: "Maintenance",
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
    image: "/images/standard-package.jpeg",
  },
  {
    id: "premium",
    name: "Premium Home Improvement Package",
    description:
      "Complete home improvement services with priority scheduling and dedicated support.",
    price: "$1599",
    duration: "16 hours",
    category: "Premium",
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
    image: "/images/premium-package.jpeg",
  },
  {
    id: "seasonal",
    name: "Seasonal Maintenance Package",
    description:
      "Keep your home prepared for changing seasons with essential maintenance.",
    price: "$599",
    duration: "6 hours",
    category: "Seasonal",
    features: [
      "Gutter Cleaning",
      "Holiday Lighting",
      "Landscaping Prep",
      "Weather Stripping",
      "HVAC Inspection",
      "Window Washing",
      "Deck Maintenance",
      "Roof Inspection",
    ],
    exclusions: [
      "Structural Repairs",
      "Interior Painting",
      "Furniture Assembly",
      "Electrical Rewiring",
    ],
    popular: false,
    image: "/images/seasonal-package.jpeg",
  },
  {
    id: "newhome",
    name: "New Home Setup Package",
    description:
      "Everything you need to make your new house feel like home.",
    price: "$899",
    duration: "8 hours",
    category: "Moving",
    features: [
      "Furniture Assembly",
      "Smart Home Installation",
      "Painting & Touch-ups",
      "TV & Audio Mounting",
      "Shelving Installation",
      "Light Fixture Installation",
      "Curtain & Blind Mounting",
      "Door Handle Replacement",
    ],
    exclusions: [
      "Major Renovations",
      "Structural Changes",
      "Plumbing Repairs",
      "Landscaping",
    ],
    popular: false,
    image: "/images/newhome-package.jpeg",
  },
  {
    id: "emergency",
    name: "Emergency Repairs Package",
    description:
      "Fast response for urgent home issues with priority scheduling.",
    price: "$549",
    duration: "4 hours",
    category: "Emergency",
    features: [
      "Plumbing Fixes",
      "Electrical Troubleshooting",
      "Home Security",
      "Leak Repairs",
      "Lock Replacement",
      "Window & Door Repairs",
      "HVAC Emergency Service",
      "Water Damage Assessment",
    ],
    exclusions: [
      "Full Renovations",
      "Cosmetic Improvements",
      "Regular Maintenance",
      "Landscaping",
    ],
    popular: false,
    image: "/images/emergency-package.jpeg",
  },
];

// Get all unique categories from package data
const allCategories = ['All', ...new Set(packageData.map(pkg => pkg.category))];

// Animation variants
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Animation for details expansion
const expandVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.2 } }
};

const PackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<(typeof packageData)[0] | null>(null);
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compare'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Using useCallback to memoize functions
  const selectPackage = useCallback((pkg: (typeof packageData)[0]) => {
    setSelectedPackage(pkg);
    if (expandedPackageId !== pkg.id) {
      setExpandedPackageId(pkg.id);
    } else {
      setExpandedPackageId(null);
    }
  }, [expandedPackageId]);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
  }, []);

  const openQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(true);
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'grid' ? 'compare' : 'grid');
  }, []);

  // Filter packages based on search term and category
  const filteredPackages = useMemo(() => {
    return packageData.filter(pkg => {
      const matchesSearch = 
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Get all unique features across all packages for comparison table
  const allFeatures = useMemo(() => {
    const features = new Set<string>();
    packageData.forEach(pkg => {
      pkg.features.forEach(feature => features.add(feature));
    });
    return Array.from(features).sort();
  }, []);

  // Default to the first package if none selected
  useEffect(() => {
    if (!selectedPackage && packageData.length > 0) {
      setSelectedPackage(packageData[0]);
    }
  }, []);

  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Service Packages - Handyman Wannabe"
        description="Choose from our selection of pre-designed service packages that combine our most popular services at discounted rates. Our current service rate is $250 for the first hour and additional $125 for each additional hour."
        keywords="handyman packages, home maintenance package, home repair bundle, service packages"
        featuredImage="/images/packages-banner.jpg"
      />

      <div className="container mx-auto px-4">
        <motion.div {...fadeInVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Service Packages</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our selection of pre-designed service packages that
            combine our most popular services at discounted rates. Our current
            service rate is $250 for the first hour and additional $125 for each
            additional hour.
          </p>
        </motion.div>

        {/* Filter and search controls */}
        <motion.div 
          {...fadeInVariants} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="w-full md:w-auto flex flex-wrap gap-2">
            {allCategories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="w-full md:w-auto flex items-center gap-4">
            <div className="relative flex-grow md:w-64">
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2" 
                  onClick={() => setSearchTerm('')}
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <button
              onClick={toggleViewMode}
              className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label={viewMode === 'grid' ? 'Switch to compare view' : 'Switch to grid view'}
            >
              {viewMode === 'grid' ? <Table className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg, index) => (
                <div key={pkg.id} className="flex flex-col">
                  <motion.div
                    className={`relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      selectedPackage?.id === pkg.id ? "ring-2 ring-primary" : ""
                    } ${pkg.popular ? "ring-2 ring-primary" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => selectPackage(pkg)}
                  >
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center z-10">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        Most Popular
                      </div>
                    )}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/images/home-Keys.avif"; // Fallback image
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-xl font-bold">{pkg.name}</h2>
                        <div className="text-sm text-white/80 bg-black/30 px-2 py-0.5 rounded mt-1 inline-block">
                          {pkg.category}
                        </div>
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
                        <ChevronDown className={`w-5 h-5 text-primary transition-transform ${expandedPackageId === pkg.id ? 'rotate-180' : ''}`} />
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{pkg.description}</p>
                    </div>
                  </motion.div>
                  
                  {/* Expandable details section */}
                  <AnimatePresence>
                    {expandedPackageId === pkg.id && (
                      <motion.div
                        key={`${pkg.id}-details`}
                        variants={expandVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded-b-xl shadow-lg mt-1 overflow-hidden border-t border-gray-100"
                      >
                        <div className="p-6 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-3">Included Services</h3>
                              <ul className="grid grid-cols-1 gap-y-2">
                                {pkg.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <Check className="w-5 h-5 text-[#91d30f] mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-3">Not Included</h3>
                              <ul className="space-y-2">
                                {pkg.exclusions.map((exclusion, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="text-red-500 mr-2 font-bold">✕</span>
                                    <span className="text-gray-700">{exclusion}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Materials & Supplies</h3>
                                <p className="text-gray-600 mb-2">
                                  Basic materials are included. Specialized materials or supplies 
                                  that exceed $50 will be quoted separately.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center mt-4">
                            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                              Book This Package
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            {/* Sticky Summary Boxes removed */}
          </div>
        )}

        {/* Comparison View */}
        {viewMode === 'compare' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-x-auto"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="sticky left-0 bg-gray-50 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                    Service / Package
                  </th>
                  {filteredPackages.map(pkg => (
                    <th key={pkg.id} scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                      <div className="flex flex-col items-center gap-2">
                        <span>{pkg.name}</span>
                        <span className="text-primary font-bold text-base">{pkg.price}</span>
                        {pkg.popular && (
                          <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allFeatures.map((feature, index) => (
                  <tr key={feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="sticky left-0 px-6 py-3 text-sm font-medium text-gray-900 bg-inherit">
                      {feature}
                    </td>
                    {filteredPackages.map(pkg => (
                      <td key={`${pkg.id}-${feature}`} className="px-6 py-3 text-sm text-gray-500 text-center">
                        {pkg.features.includes(feature) ? (
                          <Check className="w-5 h-5 text-[#91d30f] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="sticky left-0 px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                    Book Package
                  </td>
                  {filteredPackages.map(pkg => (
                    <td key={`${pkg.id}-book`} className="px-6 py-4 text-sm text-center">
                      <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                        Book Now
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}

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
