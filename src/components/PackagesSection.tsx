// src/data/packages.json
[
  {
    "id": 1,
    "name": "Holiday Lighting Package",
    "price": "$299",
    "duration": "One-time",
    "description": "Professional holiday lighting installation and removal",
    "image": "images/holiday-Lighting.avif",
    "features": [
      "Professional installation",
      "All materials included",
      "Timer setup",
      "Post-season removal",
      "Storage solution"
    ],
    "popular": true
  },
  {
    "id": 2,
    "name": "Home Maintenance Bundle",
    "price": "$499/quarter",
    "duration": "Quarterly",
    "description": "Quarterly maintenance to keep your home in top condition",
    "image": "/images/cleaner.avif",
    "features": [
      "HVAC filter replacement",
      "Gutter cleaning",
      "Plumbing inspection",
      "Electrical safety check",
      "Weather stripping check"
    ],
    "popular": false
  },
  {
    "id": 3,
    "name": "Move-In Ready Package",
    "price": "$799",
    "duration": "One-time",
    "description": "Complete home setup service for new homeowners",
    "image": "/images/home-Keys.avif",
    "features": [
      "Deep cleaning",
      "Paint touch-ups",
      "Hardware installation",
      "Smart home setup",
      "Safety inspection"
    ],
    "popular": false
  }
]

// src/components/PackagesSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import packagesData from "../data/packages.json";

const PackagesSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Packages</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated packages designed to meet your home maintenance needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packagesData.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className={`relative bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 ${
                pkg.popular ? "ring-2 ring-primary" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {pkg.popular && (
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Most Popular
                </div>
              )}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-white/90">{pkg.description}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {pkg.price}
                  </div>
                  <p className="text-gray-600">{pkg.duration}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Star className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/packages?package=${pkg.id}`}
                  className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;