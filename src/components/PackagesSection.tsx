import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Gift } from "lucide-react";
import { motion } from "framer-motion";
import PackageModal from "./PackageModal";

const packages = [
  {
    id: "basic",
    name: "Basic Handyman Package",
    description: "Essential home maintenance services",
    price: "$399",
    duration: "4 Hours",
    category: "Home Maintenance",
    image: "/images/kitchen.jpeg",
    features: [
      "Basic home repairs and maintenance",
      "Minor plumbing fixes",
      "Light fixture replacements",
      "Door and window adjustments",
    ],
  },
  {
    id: "standard",
    name: "Standard Home Maintenance",
    description: "Comprehensive home care solutions",
    price: "$799",
    duration: "8 Hours",
    category: "Home Maintenance",
    image: "/images/standard-package.jpeg",
    features: [
      "All Basic package services",
      "Electrical system maintenance",
      "Drywall repairs and painting",
      "Appliance maintenance",
    ],
  },
  {
    id: "premium",
    name: "Premium Services",
    description: "Complete home transformation",
    price: "$1599",
    duration: "16 Hours",
    category: "Home Improvement",
    image: "/images/premium-package.jpeg",
    features: [
      "All Standard package services",
      "Custom carpentry work",
      "Room renovations",
      "Smart home installations",
    ],
  },
];

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPackageModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-20 relative">
      <div className="absolute top-4 right-4 z-10">
        <Link
          to="/packages"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
        >
          View All Packages
        </Link>
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "rgb(235, 213, 193)" }}
      ></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1B4332] mb-4">
            Service Packages
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Choose from our carefully crafted service packages designed to meet
            your home maintenance needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {pkg.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-3xl font-bold text-primary">
                      {pkg.price}
                    </span>
                    <span className="text-gray-500">/{pkg.duration}</span>
                  </div>
                  <Gift className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {pkg.name}
                </h3>
                <p className="text-gray-600 mb-6">{pkg.description}</p>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openPackageModal(pkg)}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Choose Package
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Package Modal */}
      {selectedPackage && (
        <PackageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          packageData={selectedPackage}
        />
      )}
    </section>
  );
};

export default PackagesSection;
