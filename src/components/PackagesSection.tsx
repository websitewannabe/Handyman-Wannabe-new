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
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ 
          backgroundColor: "rgb(235, 213, 193)",
          backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)"
        }}
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

        <div className="flex justify-center gap-24 mb-16">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              id={`package-${pkg.id}`}
              className="text-center cursor-pointer group relative"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onClick={() => handleIconClick(pkg.id)}
            >
              <div className="relative flex flex-col items-center">
                <div className="bg-gradient-to-br from-white to-gray-50 w-40 h-40 rounded-3xl shadow-lg mb-10 flex items-center justify-center transform group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-primary/5 border-2 border-transparent group-hover:border-primary/20">
                  <pkg.icon className="w-24 h-24 text-primary transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-3 drop-shadow-sm group-hover:drop-shadow-lg" />
                </div>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-[2.5rem] -z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"
                  animate={{
                    scale: [1, 1.03, 1],
                    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-800 mb-3 group-hover:text-primary transition-all duration-300 text-center tracking-tight">
                {pkg.name}
              </h3>
              <p className="text-xl font-semibold text-white group-hover:scale-110 transition-all duration-300 text-center">
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