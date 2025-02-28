import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, X, Check, DollarSign, Clock } from "lucide-react";
import PackageModal from "../components/PackageModal";

// Example package data - replace with your actual data
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

const PackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPackageModal = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Service Packages</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our selection of pre-designed service packages that combine our most popular services at discounted rates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packageData.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openPackageModal(pkg)}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {pkg.name}
                </h2>
                <p className="text-gray-600 mb-6 h-20">{pkg.description}</p>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-primary mr-1" />
                    <span className="text-2xl font-bold text-gray-800">
                      {pkg.price}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-600 mr-1" />
                    <span className="text-gray-600">{pkg.duration}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Includes:
                  </h3>
                  <ul className="space-y-2">
                    {pkg.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex text-gray-700">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {pkg.features.length > 3 && (
                      <li className="text-primary font-medium pt-1">
                        +{pkg.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Need a Custom Package?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            We can create a personalized service package tailored to your specific home improvement needs.
          </p>
          <button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
            Request a Custom Quote
          </button>
        </motion.div>
      </div>

      {/* Package Modal */}
      {selectedPackage && (
        <PackageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          packageData={selectedPackage}
        />
      )}
    </div>
  );
};

export default PackagesPage;