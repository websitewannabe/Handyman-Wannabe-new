import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Home,
  Shield,
  ThumbsUp,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  UserCheck,
  Calendar,
  ChevronRight,
  Camera,
  Lightbulb,
  Tv,
  Zap,
  Wifi,
  Laptop,
  Smartphone,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

// Import services data
import servicesData from "../data/services.json";

// Filter smart home services
const smartHomeServices = servicesData.filter(
  (service) => service.category === "Smart Home",
);

// Group services by subcategory
const groupedServices = smartHomeServices.reduce(
  (acc, service) => {
    if (!acc[service.subcategory]) {
      acc[service.subcategory] = [];
    }
    acc[service.subcategory].push(service);
    return acc;
  },
  {} as Record<string, typeof smartHomeServices>,
);

import SEO from "../components/SEO";
import { pageSEOData, getCanonicalUrl } from "../utils/seoHelpers";

const SmartHomesPage = () => {
  // SEO data for Smart Homes page
  const seoData = {
    title: 'Smart Home Services - Professional Installation & Setup',
    description: 'Professional smart home installation services including security systems, lighting automation, and home theaters. Expert setup and integration for all your smart devices.',
    keywords: 'smart home services, smart home installation, home automation, smart security, smart lighting',
    featuredImage: '/images/smart-Lock.avif',
    path: '/services/smart-homes'
  };

  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Map subcategories to display names and icons
  const subcategoryInfo = {
    "smart-security-surveillance": {
      title: "Smart Security & Surveillance",
      description:
        "Professional installation of smart security cameras and monitoring systems.",
      icon: Camera,
    },
    "smart-lighting-electrical": {
      title: "Smart Lighting & Electrical",
      description:
        "Automate and control your home lighting with smart solutions.",
      icon: Lightbulb,
    },
    "smart-thermostats-climate": {
      title: "Smart Thermostats & Climate Control",
      description:
        "Efficient climate control with smart thermostats and sensors.",
      icon: Zap,
    },
    "smart-entertainment-theater": {
      title: "Smart Entertainment & Home Theater Setup",
      description:
        "Professional home theater and entertainment system installation.",
      icon: Tv,
    },
    "smart-home-automation": {
      title: "Smart Home Automation & Voice Control",
      description:
        "Comprehensive home automation with voice control integration.",
      icon: Home,
    },
    "smart-garage-outdoor": {
      title: "Smart Garage & Outdoor Automation",
      description: "Automate garage doors and outdoor lighting systems.",
      icon: Settings,
    },
    "smart-appliance-setup": {
      title: "Smart Appliance Setup",
      description: "Connect and configure smart home appliances.",
      icon: Smartphone,
    },
    "smart-networking-connectivity": {
      title: "Smart Networking & Connectivity",
      description: "Ensure reliable connectivity for all smart devices.",
      icon: Wifi,
    },
  };

  return (
    <div className="relative">
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        featuredImage={seoData.featuredImage}
        ogImage={seoData.featuredImage}
        canonicalUrl={getCanonicalUrl ? getCanonicalUrl(seoData.path) : `https://www.handymanwannabe.com${seoData.path}`}
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/smart-Lock.avif")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1B4332]/80"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Smart Home Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Upgrade your home with the latest smart technology. From security
            cameras to home automation, our expert technicians ensure seamless
            setup and integration.
          </motion.p>
          <motion.button
            className="bg-primary text-white font-bold text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 rounded-lg hover:bg-primary/90 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get an Instant Quote
          </motion.button>
        </div>

        {/* Wave transition */}
        <div className="absolute -bottom-1 left-0 right-0 z-20">
          <svg
            className="w-full relative"
            style={{ height: "120px", color: "#ebd5c1" }}
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M 0,60 C 150,60 200,100 300,100 C 400,100 500,40 600,40 C 700,40 800,100 900,100 C 1000,100 1050,60 1200,60 L 1200,120 L 0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20" style={{ backgroundColor: "#ebd5c1" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-8"
              >
                <img
                  src="/public/images/Handyman_Logo.png"
                  alt="Handyman Wannabe Logo"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    console.error('Image failed to load:', e.currentTarget.src);
                    e.currentTarget.src = "/images/Handyman_Logo.png"; // Fallback path
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-[#1B4332]">
                  Expert Smart Home Services
                </h2>
                <p className="text-xl text-gray-800 mb-6">
                  Handyman Wannabe specializes in Smart Home installations that
                  enhance convenience, security, and energy efficiency. Whether
                  you need a smart thermostat, video doorbell, or a fully
                  integrated home automation system, we provide expert
                  installation and setup tailored to your needs.
                </p>
                <p className="text-lg text-gray-700">
                  Our certified technicians stay up-to-date with the latest
                  smart home technologies to deliver seamless integration and
                  optimal performance for your connected home.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Smart Home Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {Object.entries(groupedServices).map(
              ([subcategory, services], index) => {
                const info =
                  subcategoryInfo[subcategory as keyof typeof subcategoryInfo];
                if (!info) return null;

                return (
                  <Link
                    key={subcategory}
                    to={`/service-directory?category=${subcategory}`}
                    className="block"
                    aria-label={`Browse ${info.title} smart home services and details`}
                  >
                    <motion.div
                      className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative h-48">
                        <img
                          src={services[0]?.image || "/images/smart-Lock.avif"}
                          alt={info.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                          {info.title}
                        </h3>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-gray-600 mb-4">{info.description}</p>
                        <ul className="space-y-2 mb-6 flex-grow">
                          {services.slice(0, 4).map((service, serviceIndex) => (
                            <li key={serviceIndex} className="flex items-start">
                              <Star className="w-5 h-5 text-primary mt-1 mr-2 flex-shrink-0" />
                              <span>{service.features[0]}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-primary/10 p-4 rounded-lg mt-auto">
                          <p className="text-sm font-medium text-primary">
                            Available Services:
                          </p>
                          <p className="text-gray-700">
                            {services.length} services in this category
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get your smart home setup done in just a few simple steps.
              Professional service, guaranteed satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: ClipboardList,
                title: "Request a Quote",
                description:
                  "Describe your project and get a detailed estimate.",
              },
              {
                icon: UserCheck,
                title: "Get Matched",
                description:
                  "Connect with a professional handyman for your needs.",
              },
              {
                icon: Calendar,
                title: "Schedule & Complete",
                description:
                  "Pick a convenient time and get the job done right.",
              },
              {
                icon: Star,
                title: "Review & Repeat",
                description: "Share your experience and book again with ease.",
              },
            ].map((step, index, array) => (
              <React.Fragment key={index}>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 relative border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-white text-secondary rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="mb-4 text-white">
                    <step.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-white/80">{step.description}</p>

                  {/* Add arrow after each step except the last one */}
                  {index < array.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-8 h-8 text-white" />
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Do I need special wiring for smart home devices?",
                answer:
                  "Most smart home devices are wireless, but some may require minor electrical work for installation. Our technicians will assess your needs during the consultation and explain any necessary modifications.",
              },
              {
                question: "Can I control all my smart devices with one app?",
                answer:
                  "Yes, we can help integrate multiple devices into a single smart home platform like Alexa, Google Home, or Apple HomeKit. This allows you to control all your smart devices from one central app.",
              },
              {
                question: "Do you provide smart home consultations?",
                answer:
                  "Yes, we offer expert advice on selecting the best smart home solutions for your needs. Our technicians can assess your home and recommend the most suitable devices and systems.",
              },
              {
                question: "Do you offer ongoing support for smart home setups?",
                answer:
                  "Yes, we provide troubleshooting and maintenance services to keep your smart home running smoothly. We can help with software updates, device reconfiguration, and resolving any connectivity issues.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert smart home services from our skilled professionals.
            Contact us today for a free quote!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-white text-primary font-bold text-xl px-12 py-4 rounded-lg hover:bg-gray-100 transition-colors">
              Get an Instant Quote
            </button>
            <a
              href="tel:7193156628"
              className="flex items-center text-2xl font-bold hover:text-white/90 transition-colors"
            >
              <Phone className="w-6 h-6 mr-2" />
              (719) 315-6628
            </a>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50">
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SmartHomesPage;