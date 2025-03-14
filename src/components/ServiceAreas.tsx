import React from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ServiceAreas = () => {
  return (
    <>
      <section className="relative pt-32 pb-20" style={{ backgroundColor: "#ebd5c1" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Interior Services Column */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full max-w-2xl">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/interior-services.jpeg" 
                    alt="Interior Services"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white">Interior Services</h3>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services Column */}
            <div className="flex flex-col h-full">
              <motion.h2
                className="text-3xl font-bold mb-8 text-[#5d4037]"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Services
              </motion.h2>
              <div className="space-y-6 flex-grow">
                <motion.div
                  className="bg-white/10 rounded-lg p-6 transition-all hover:bg-white/20 cursor-pointer"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-[#5d4037] mr-2" />
                    <h3 className="text-xl font-bold text-[#5d4037]">Exterior Services</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-[#5d4037]">
                      Landscaping
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-[#5d4037]">
                      Deck Repair
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-[#5d4037]">
                      Gutter Cleaning
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/10 rounded-lg p-6 transition-all hover:bg-white/20 cursor-pointer"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-[#5d4037] mr-2" />
                    <h3 className="text-xl font-bold text-[#5d4037]">Interior Services</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-[#5d4037]">
                      Painting
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-[#5d4037]">
                      Plumbing
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-[#5d4037]">
                      Electrical
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-white/90 text-lg">
              Our team of certified professionals brings decades of combined
              experience to every project, ensuring quality workmanship and
              exceptional service.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Expertise Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted Local Expertise
            </h2>
            <p className="text-xl text-white/90">
              Serving the Greater Colorado Springs Area since 2018
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "★ ★ ★ ★ ★", label: "Google Reviews" },
              { value: "100+", label: "Services Listed" },
              { value: "7 Years", label: "of Reliable Service" },
              { value: "30+", label: "Years of Trade Experience" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-4xl font-bold text-white block mb-2">
                  {stat.value}
                </span>
                <span className="text-lg text-white/90">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-white/90 text-lg">
              Our team of certified professionals brings decades of combined
              experience to every project, ensuring quality workmanship and
              exceptional service.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceAreas;