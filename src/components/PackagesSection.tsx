import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from 'react-router-dom';

const packages = [
  {
    name: "Basic Handyman Package",
    price: "$250/hour",
    description: "Perfect for small repairs and basic home maintenance",
    image: "/images/basic-handyman.jpeg",
    features: [
      "General repairs",
      "Basic installations",
      "Minor plumbing fixes",
      "Simple electrical work",
      "Furniture assembly"
    ],
    popular: false,
    link: "/packages?package=basic"
  },
  {
    name: "Standard Home Maintenance",
    price: "$499/quarter",
    description: "Comprehensive quarterly maintenance service",
    image: "/images/standard-maintenance.jpeg",
    features: [
      "Seasonal inspections",
      "Preventive maintenance",
      "HVAC filter replacement",
      "Gutter cleaning",
      "Safety checks"
    ],
    popular: true,
    link: "/packages?package=standard"
  },
  {
    name: "Premium Services",
    price: "Custom",
    description: "Full-service solution for complex projects",
    image: "/images/premium-services.jpeg",
    features: [
      "Custom renovations",
      "Major installations",
      "Complex repairs",
      "Project management",
      "Priority scheduling"
    ],
    popular: false,
    link: "/packages?package=premium"
  }
];

const PackagesSection = () => {
  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            className="text-dark font-bold text-lg mb-2 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Service Packages
          </motion.span>
          <motion.h2
            className="text-4xl font-bold mb-4 text-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Choose Your Package
          </motion.h2>
          <motion.p
            className="text-xl text-dark/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Select from our carefully designed service packages that fit your needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Popular
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="text-2xl font-bold text-primary mb-6">
                  {pkg.price}
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={pkg.link}
                  className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-semibold py-3 rounded-lg transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/packages"
            className="inline-block bg-dark hover:bg-dark/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            View All Packages
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;