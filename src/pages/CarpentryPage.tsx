import React from "react";
import { motion } from "framer-motion";
import {
  Hammer,
  Shield,
  Tool,
  Sofa,
  Ruler,
  DoorOpen,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import servicesData from "../data/services.json";

const carpentryServices = servicesData.filter(
  (service) => service.category === "Carpentry"
);

const servicesGrouped = {
  interior: [
    {
      title: "General Carpentry",
      icon: Hammer,
      description: "Basic carpentry services for home repairs and improvements",
      link: "/services/general-carpentry",
    },
    {
      title: "Cabinet & Furniture Work",
      icon: Sofa,
      description: "Custom cabinet solutions and furniture repairs",
      link: "/services/cabinet-furniture-work",
    },
    {
      title: "Framing & Drywall",
      icon: Ruler,
      description: "Structural carpentry and wall modifications",
      link: "/services/framing-drywall-related",
    },
  ],
  exterior: [
    {
      title: "Deck & Exterior Work",
      icon: Tool,
      description: "Outdoor carpentry and deck maintenance",
      link: "/services/deck-exterior-work",
    },
    {
      title: "Door & Window Work",
      icon: DoorOpen,
      description: "Installation and repair of doors and windows",
      link: "/services/door-window-work",
    },
    {
      title: "Small Carpentry Jobs",
      icon: Wrench,
      description: "Quick fixes and minor carpentry tasks",
      link: "/services/small-carpentry-jobs",
    },
  ],
};

const CarpentryPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 bg-[#1B4332] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Professional Carpentry Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90"
            >
              Expert carpentry solutions for all your home improvement needs
            </motion.p>
          </div>
        </div>
      </section>

      {/* Interior Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#1B4332] mb-4">
            Interior Carpentry Services
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Professional solutions for your indoor carpentry needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {servicesGrouped.interior.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={service.link}
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B4332] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exterior Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#1B4332] mb-4">
            Exterior Carpentry Services
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Transform your outdoor spaces with our expert carpentry services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {servicesGrouped.exterior.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={service.link}
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B4332] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CarpentryPage;