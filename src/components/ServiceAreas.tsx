import React from "react";
import { MapPin, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    category: "Plumbing",
    description: "Expert plumbing services for all your needs.",
    icon: <MapPin className="w-6 h-6 text-primary" />,
    items: ["Leak detection and repair", "Fixture installation", "Drain cleaning"],
    link: "/plumbing",
  },
  {
    category: "Electrical",
    description: "Reliable electrical work for your home.",
    icon: <ArrowRight className="w-6 h-6 text-primary rotate-90" />,
    items: ["Wiring upgrades", "Outlet installation", "Lighting fixture installation"],
    link: "/electrical",
  },
  {
    category: "Carpentry",
    description: "Professional carpentry services for your home improvement projects.",
    icon: <Check className="w-6 h-6 text-primary" />,
    items: ["Custom cabinetry", "Shelving installation", "Deck building"],
    link: "/carpentry",
  },
];


const ServiceAreas = () => {
  return (
    <>
      <section className="relative pt-32 pb-20" style={{ backgroundColor: "#ebd5c1" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              From basic repairs to complex installations, we offer a comprehensive range
              of professional handyman services to meet all your home improvement needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{service.category}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.items.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-primary mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={service.link}
                  className="inline-flex items-center text-primary hover:text-primary/80"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
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