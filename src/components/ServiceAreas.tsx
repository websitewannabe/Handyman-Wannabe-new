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
    region: "Teller County",
    areas: ["Green Mountain Falls, CO", "Manitou Springs, 80829, CO"],
  }
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
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207019.11336308766!2d-104.9200903957284!3d38.87345444651031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713412ea1e6d22b%3A0x418eeb92f5e86b13!2sColorado%20Springs%2C%20CO!5e0!3m2!1sen!2sus!4v1666123456789!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Service Area Map"
                    className="absolute inset-0"
                  ></iframe>
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

      {/* Trusted Local Expertise Section */}
      <section className="py-16 bg-[#FFA500]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            Trusted Local Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "5+ Years Experience",
                description: "Serving Colorado Springs since 2018"
              },
              {
                title: "Local Knowledge",
                description: "Deep understanding of local home needs"
              },
              {
                title: "Licensed & Insured",
                description: "Full coverage for your peace of mind"
              },
              {
                title: "5-Star Service",
                description: "Consistently top-rated by customers"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/90 text-lg">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-[#FFA500]">
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