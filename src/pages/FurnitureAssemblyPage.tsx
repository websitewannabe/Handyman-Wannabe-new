import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Sofa,
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
  Bed,
  Umbrella,
  Baby,
  Dumbbell,
  Package,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

// Import services data
import servicesData from "../data/services.json";

// Filter furniture assembly services
const furnitureAssemblyServices = servicesData.filter(
  (service) => service.category === "Furniture Assembly",
);

// Group services by subcategory
const groupedServices = furnitureAssemblyServices.reduce(
  (acc, service) => {
    if (!acc[service.subcategory]) {
      acc[service.subcategory] = [];
    }
    acc[service.subcategory].push(service);
    return acc;
  },
  {} as Record<string, typeof furnitureAssemblyServices>,
);

const FurnitureAssemblyPage = () => {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Map subcategories to display names and icons
  const subcategoryInfo = {
    "furniture-assembly": {
      title: "General Furniture Assembly",
      description:
        "Professional assembly of indoor and outdoor furniture pieces.",
      icon: Sofa,
    },
    "childrens-furniture-playsets": {
      title: "Children's Furniture & Playsets",
      description: "Safe assembly of children's furniture and play equipment.",
      icon: Baby,
    },
    "fitness-equipment-assembly": {
      title: "Fitness Equipment Assembly",
      description: "Professional assembly of exercise and fitness equipment.",
      icon: Dumbbell,
    },
    "storage-organization-systems": {
      title: "Storage & Organization Systems",
      description:
        "Installation of storage solutions and organization systems.",
      icon: Package,
    },
    "miscellaneous-assembly-services": {
      title: "Miscellaneous Assembly Services",
      description:
        "Assembly services for various furniture and equipment types.",
      icon: Briefcase,
    },
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/living-Room3.avif")',
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
            Furniture Assembly Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Professional furniture assembly services for homes and businesses.
            From IKEA furniture to custom installations, our experts ensure
            sturdy and reliable setups.
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
                  src="/images/Handyman_Logo.png"
                  alt="Handyman Wannabe Logo"
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-[#1B4332]">
                  Expert Furniture Assembly
                </h2>
                <p className="text-xl text-gray-800 mb-6">
                  Handyman Wannabe provides expert furniture assembly services,
                  ensuring your furniture is built securely and efficiently.
                  Whether you need help assembling a new bed frame, office desk,
                  or patio set, our skilled professionals make the process
                  stress-free.
                </p>
                <p className="text-lg text-gray-700">
                  With years of experience and attention to detail, we ensure
                  every piece is assembled correctly and safely for long-lasting
                  use.
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
            Our Assembly Services
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
                    aria-label={`Learn more about ${info.title}`} //Added aria-label
                  >
                    <motion.div
                      className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative h-48">
                        <img
                          src={
                            services[0]?.image || "/images/living-Room3.avif"
                          }
                          alt={info.title}
                          className="w-full h-full object-cover"
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
              Get your furniture assembly done in just a few simple steps.
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
                question: "Do I need to provide tools for assembly?",
                answer:
                  "No, our technicians bring all the necessary tools and equipment needed for assembly. We ensure professional-grade tools are used for the best results.",
              },
              {
                question: "Can you secure furniture to the wall for safety?",
                answer:
                  "Yes, we install anti-tip hardware to secure bookshelves, dressers, and other heavy furniture to prevent accidents, especially important in homes with children.",
              },
              {
                question: "How long does furniture assembly take?",
                answer:
                  "Assembly time varies depending on the complexity of the item. Most pieces take between 30 minutes to 2 hours, but we'll provide a specific time estimate before starting.",
              },
              {
                question: "Do you assemble all brands of furniture?",
                answer:
                  "Yes, we assemble furniture from IKEA, Wayfair, Amazon, Walmart, and all major retailers. Our experienced technicians are familiar with a wide range of furniture brands and styles.",
              },
              {
                question: "Do you offer disassembly services?",
                answer:
                  "Yes, we can disassemble furniture for moving, storage, or reassembly in another location. We ensure careful handling to prevent damage during the process.",
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
                  <span className="font-bold text-lg">{faq.question}</span>
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
            Need Furniture Assembly Help?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert furniture assembly services from our skilled
            professionals. Contact us today for a free quote!
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

export default FurnitureAssemblyPage;
