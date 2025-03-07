
import React, { useState, useCallback, useMemo } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Pre-defined service areas to avoid recreation on each render
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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ServiceAreas = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  // Memoized toggle function to prevent recreation on each render
  const toggleRegion = useCallback((region: string) => {
    setActiveRegion(prev => prev === region ? null : region);
  }, []);

  // Rendered areas section memoized to prevent unnecessary re-renders
  const renderedAreas = useMemo(() => (
    <div className="space-y-6 flex-grow">
      {serviceAreas.map((region, index) => (
        <motion.div
          key={region.region}
          className={`bg-white/10 rounded-lg p-6 transition-all hover:bg-white/20 cursor-pointer ${
            activeRegion === region.region ? "bg-white/20" : ""
          }`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toggleRegion(region.region)}
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
                key={areaIndex}
                className="inline-block bg-white/20 rounded-full px-3 py-1 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + areaIndex * 0.05 }}
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  ), [activeRegion, toggleRegion]);

  return (
    <>
      {/* Service Areas Section */}
      <section 
        className="py-20" 
        style={{ 
          backgroundColor: "#ebd5c1",
          backgroundImage: "url('/images/texture-bg.webp')",
          backgroundBlendMode: "overlay",
          backgroundSize: "cover" 
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-white p-4 rounded-lg shadow-lg overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207019.11336308766!2d-104.9200903957284!3d38.87345444651031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713412ea1e6d22b%3A0x418eeb92f5e86b13!2sColorado%20Springs%2C%20CO!5e0!3m2!1sen!2sus!4v1666123456789!5m2!1sen!2sus"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Service Area Map"
              ></iframe>
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
              
              {renderedAreas}
              
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

export default React.memo(ServiceAreas);
