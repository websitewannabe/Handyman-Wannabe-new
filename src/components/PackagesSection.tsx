import React from "react";
import { motion } from "framer-motion";
import { Check, Star, Gift } from "lucide-react";

const packages = [
  {
    name: "Holiday Lighting Package",
    price: "$299",
    description: "Professional holiday lighting installation and removal",
    image: "public/images/holiday-Lighting.avif",
    features: [
      "Professional installation",
      "All materials included",
      "Timer setup",
      "Post-season removal",
      "Storage solution",
    ],
    popular: true,
  },
  {
    name: "Home Maintenance Bundle",
    price: "$499/quarter",
    description: "Quarterly maintenance to keep your home in top condition",
    image: "public/images/cleaner.avif",
    features: [
      "HVAC filter replacement",
      "Gutter cleaning",
      "Plumbing inspection",
      "Electrical safety check",
      "Weather stripping check",
    ],
    popular: false,
  },
  {
    name: "Move-In Ready Package",
    price: "$799",
    description: "Complete home setup service for new homeowners",
    image: "public/images/home-Keys.avif",
    features: [
      "Deep cleaning",
      "Paint touch-ups",
      "Hardware installation",
      "Smart home setup",
      "Safety inspection",
    ],
    popular: false,
  },
];

const PackagesSection = () => {
  return (
    <section className="py-20 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("public/images/construction-Worker2.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(235, 213, 193, 0.9)" }}
        ></div>
      </div>

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
            Bundle & Save
          </motion.h2>
          <motion.p
            className="text-xl text-dark/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Choose from our carefully curated service packages designed to meet
            your needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
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
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-3xl font-bold text-primary">
                      {pkg.price}
                    </span>
                  </div>
                  <Gift className="w-6 h-6 text-primary" />
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Choose Package
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
