import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Clipboard,
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
  Home,
  Search,
  AlertTriangle,
  FileCheck,
  Building2,
  Ruler,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomeInspectionsPage = () => {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/home-Keys.avif")',
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
            Home Inspection Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Ensure your home is safe, secure, and up to code with professional
            home inspection services. We provide detailed evaluations for
            buyers, sellers, and homeowners looking to assess their property's
            condition.
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
                  Expert Home Inspection Services
                </h2>
                <p className="text-xl text-gray-800 mb-6">
                  Handyman Wannabe offers professional home inspection services
                  to help homeowners, buyers, and real estate agents make
                  informed decisions. Whether you need a pre-purchase
                  inspection, safety assessment, or general maintenance check,
                  our certified inspectors provide thorough and accurate
                  evaluations.
                </p>
                <p className="text-lg text-gray-700">
                  With certified professionals and comprehensive reporting, we
                  help ensure your property is safe and sound.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories section removed as requested */}

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Coming soon!
          </p>
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
              Get your home inspection done in just a few simple steps.
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
                  "Connect with a professional inspector for your needs.",
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
                question: "How long does a typical home inspection take?",
                answer:
                  "Most inspections take between 2-4 hours, depending on the size and condition of the home. We conduct thorough evaluations to ensure no major issues are missed.",
              },
              {
                question: "Do I need to be present for the inspection?",
                answer:
                  "While not required, we recommend attending the inspection so our inspector can walk you through any findings and answer questions in real-time.",
              },
              {
                question: "Will I receive a report after the inspection?",
                answer:
                  "Yes, you'll receive a detailed digital report with photos, findings, and recommendations within 24 hours of the inspection completion.",
              },
              {
                question: "Can you inspect newly constructed homes?",
                answer:
                  "Yes, we offer new construction inspections to verify quality and identify any issues before the builder's warranty expires.",
              },
              {
                question: "What should I do if the inspection reveals issues?",
                answer:
                  "Our reports include repair recommendations, and our handyman team can help address many of the issues found during the inspection.",
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
            Ready to Inspect Your Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert home inspection services from our certified
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

export default HomeInspectionsPage;
