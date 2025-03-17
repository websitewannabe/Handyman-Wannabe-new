import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tool, ChevronRight, Hammer, Saw, Ruler, Home, Construction, Briefcase } from 'lucide-react';

const CarpentryPage = () => {
  const carpentryServices = [
    {
      category: "Interior Carpentry",
      icon: Home,
      description: "Expert interior woodworking and finishing",
      services: [
        "Crown Molding Installation",
        "Door Installation & Repair",
        "Cabinet Installation & Repair",
        "Baseboard Installation",
        "Interior Trim Work"
      ]
    },
    {
      category: "Structural Carpentry",
      icon: Construction,
      description: "Professional structural woodwork solutions",
      services: [
        "Framing",
        "Support Beam Installation",
        "Joist Installation & Repair",
        "Wall Construction",
        "Post Installation"
      ]
    },
    {
      category: "Custom Woodworking",
      icon: Saw,
      description: "Bespoke carpentry and custom solutions",
      services: [
        "Built-in Shelving",
        "Custom Storage Solutions",
        "Decorative Wood Features",
        "Custom Furniture Assembly",
        "Wood Restoration"
      ]
    },
    {
      category: "Exterior Carpentry",
      icon: Tool,
      description: "Outdoor carpentry and construction",
      services: [
        "Deck Building & Repair",
        "Fence Installation",
        "Siding Installation & Repair",
        "Outdoor Structure Building",
        "Exterior Trim Work"
      ]
    },
    {
      category: "Finish Carpentry",
      icon: Ruler,
      description: "Detailed finishing and precision work",
      services: [
        "Window Installation & Trim",
        "Custom Mantels",
        "Wainscoting",
        "Custom Cabinetry",
        "Architectural Details"
      ]
    },
    {
      category: "Commercial Carpentry",
      icon: Briefcase,
      description: "Professional commercial carpentry services",
      services: [
        "Office Build-outs",
        "Retail Fixtures",
        "Commercial Door Installation",
        "Partition Walls",
        "Display Units"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Carpentry Services | Handyman Wannabe</title>
        <meta name="description" content="Professional carpentry services for residential and commercial properties in Colorado Springs. From custom woodworking to structural carpentry." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-[#1B4332] py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Professional Carpentry Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-white/90"
            >
              Expert carpentry solutions for all your residential and commercial needs
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Carpentry Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {carpentryServices.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {category.category}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {category.services.map((service) => (
                      <li key={service} className="flex items-center text-gray-600">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/services/carpentry/${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-200"
                  >
                    Learn More
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CarpentryPage;