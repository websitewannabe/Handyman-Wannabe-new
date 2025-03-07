import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const serviceAreas = [
  {
    region: "El Paso County",
    areas: [
      "Fountain, CO",
      "Monument, CO",
      "Falcon, 80831, CO",
      "Peyton, 80831, CO",
      "Colorado Springs, CO",
    ],
  },
  {
    region: "Douglas County",
    areas: ["Larkspur, 80118, CO"],
  },
  {
    region: "Teller County",
    areas: ["Green Mountain Falls, CO", "Manitou Springs, 80829, CO"],
  },
];

const ServiceAreas = () => {
  return (
    <>
      <section
        className="relative pt-32 pb-20"
        style={{ backgroundColor: "#ebd5c1" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Video Column */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full max-w-2xl">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-8">
                  <img
                    src="/images/Handyman_Logo.png"
                    alt="Handyman Wannabe Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Service Areas Column */}
            <div className="flex flex-col h-full">
              <motion.h2
                className="text-3xl font-bold mb-8 text-[#5d4037]"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Service Areas
              </motion.h2>
              <div className="space-y-6 flex-grow">
                {serviceAreas.map((region, index) => (
                  <motion.div
                    key={region.region}
                    className="bg-white/10 rounded-lg p-6 transition-all hover:bg-white/20 cursor-pointer"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center mb-3">
                      <MapPin className="w-5 h-5 text-[#5d4037] mr-2" />
                      <h3 className="text-xl font-bold text-[#5d4037]">
                        {region.region}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {region.areas.map((area, areaIndex) => (
                        <motion.span
                          key={area}
                          className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-[#5d4037]"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.2 + areaIndex * 0.1,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {area}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link
                  to="/service-area"
                  className="inline-flex items-center mt-8 text-[#5d4037] font-bold hover:text-[#5d4037]/80 transition-colors"
                >
                  View All Service Areas
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </div>
          </div>
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