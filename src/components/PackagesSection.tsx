import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHouse, GiToolbox, GiLaurelCrown } from "react-icons/gi";
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
    icon: GiHouse,
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
    icon: GiToolbox,
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
    icon: GiLaurelCrown,
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

  const handleIconClick = (packageId) => {
    const packageElement = document.getElementById(`package-${packageId}`);
    if (packageElement) {
      packageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const url = `/packages?package=${packageId}`;
        window.open(url, '_self');
      }, 500);
    }
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
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#1B4332] mb-6">
            Service Packages
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Choose from our carefully crafted service packages designed to meet
            your home maintenance needs
          </p>
        </div>

        <div className="flex justify-center gap-20 mb-16">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              id={`package-${pkg.id}`}
              className="text-center cursor-pointer group relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleIconClick(pkg.id)}
            >
              <div className="relative">
                <div className="bg-white w-32 h-32 rounded-2xl shadow-md mb-6 flex items-center justify-center transform group-hover:shadow-xl transition-all duration-300 group-hover:bg-primary/5">
                  <pkg.icon className="w-16 h-16 text-primary transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <motion.div
                  className="absolute -inset-2 bg-primary/5 rounded-3xl -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                {pkg.name}
              </h3>
              <p className="text-xl font-semibold text-primary">
                {pkg.price}
              </p>
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