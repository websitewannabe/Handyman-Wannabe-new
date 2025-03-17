
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiToolbox, GiHouse, GiStarFormation } from "react-icons/gi";
import { motion } from "framer-motion";

const PackagesSection = () => {
  const packageData = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: '$399',
      icon: GiToolbox,
      description: 'Essential handyman services'
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: '$799',
      icon: GiHouse,
      description: 'Comprehensive home maintenance'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: '$1599',
      icon: GiStarFormation,
      description: 'Complete home improvement'
    }
  ];

  const handleIconClick = (packageId: string) => {
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
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-[#1B4332] mb-6"
          >
            Service Packages
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
          >
            Choose from our carefully crafted service packages designed to meet
            your home maintenance needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16">
          {packageData.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
              onClick={() => handleIconClick(pkg.id)}
            >
              <motion.div
                className="relative w-32 h-32 mb-6 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform transition-all duration-300 group-hover:shadow-xl">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="relative h-full flex items-center justify-center">
                  <pkg.icon className="w-16 h-16 text-primary transform transition-all duration-300 group-hover:scale-110" />
                </div>
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-[#1B4332] mb-2 transition-colors duration-300 group-hover:text-[#f05a27]"
                whileHover={{ scale: 1.02 }}
              >
                {pkg.name}
              </motion.h3>

              <motion.p
                className="text-xl font-semibold text-[#f05a27] mb-3"
                whileHover={{ scale: 1.02 }}
              >
                {pkg.price}
              </motion.p>

              <p className="text-gray-600">{pkg.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
