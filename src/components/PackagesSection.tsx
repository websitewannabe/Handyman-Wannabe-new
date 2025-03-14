import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHouse, GiToolbox, GiLaurelCrown } from "react-icons/gi";
import { motion } from "framer-motion";
import PackageModal from "./PackageModal";

const packages = [
  {
    id: "basic",
    name: "Basic Package",
    price: "$399",
    icon: GiHouse,
  },
  {
    id: "standard",
    name: "Standard Package",
    price: "$799",
    icon: GiToolbox,
  },
  {
    id: "premium",
    name: "Premium Package",
    price: "$1599",
    icon: GiLaurelCrown,
  },
];

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = (packageId) => {
    const selected = packages.find((pkg) => pkg.id === packageId);
    setSelectedPackage(selected);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="relative py-24 bg-[rgb(235, 213, 193)]">
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

        <div className="flex justify-center gap-20 mb-12">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              id={`package-${pkg.id}`}
              className="text-center cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleIconClick(pkg.id)}
            >
              <div className="relative">
                <div className="bg-white w-32 h-32 rounded-2xl shadow-lg mb-6 flex items-center justify-center transform group-hover:shadow-xl transition-all duration-300 group-hover:bg-primary/5">
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