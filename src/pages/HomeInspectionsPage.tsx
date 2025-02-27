import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClipboardCheck, Shield, Clock, ThumbsUp, ArrowRight, Search, Home } from "lucide-react";

const HomeInspectionsPage = () => {
  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-6"
            >
              Professional Home Inspection Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-8"
            >
              Comprehensive inspections by certified professionals to help you make informed decisions about your property.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Schedule an Inspection
              </Link>
              <Link
                to="/service-directory"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                View All Services
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Our Inspection Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ClipboardCheck,
                title: "Thorough Inspections",
                description: "Comprehensive evaluations of all property systems"
              },
              {
                icon: Shield,
                title: "Certified Professionals",
                description: "Licensed and experienced home inspectors"
              },
              {
                icon: Clock,
                title: "Timely Reports",
                description: "Detailed reports delivered within 24 hours"
              },
              {
                icon: ThumbsUp,
                title: "Satisfaction Guaranteed",
                description: "Our work isn't done until you're satisfied"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <feature.icon className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Inspection Services</h2>

          <div className="flex justify-center items-center max-w-6xl mx-auto">
            <div className="text-3xl font-bold text-center text-primary py-16">
              👉 Our Services Coming Soon!
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Schedule Your Home Inspection?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our experienced inspectors are ready to help you understand your property's condition and make informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/service-directory"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeInspectionsPage;