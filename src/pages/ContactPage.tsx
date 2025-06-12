
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import ContactForm from "../components/ContactForm";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const faqs = [
  {
    question: "How soon can I book a handyman?",
    answer:
      "We offer same-day and next-day service for many requests. For specific projects, we'll schedule based on your preferences and our earliest availability.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, cash, and digital payments through services like Apple Pay and Google Pay.",
  },
  {
    question: "Do you offer emergency services?",
    answer:
      "Yes, we provide 24/7 emergency services for urgent repairs. Additional charges may apply for after-hours service.",
  },
  {
    question: "Are your handymen licensed and insured?",
    answer:
      "Yes, all our handymen are fully licensed, bonded, and insured for your peace of mind.",
  },
];

const ContactPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="pt-28">
      {/* Contact Information & Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              className="text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Get in Touch
            </motion.h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <a
                    href="tel:2676357958"
                    className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-primary/10 p-4 rounded-full mr-6">
                      <Phone className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                      <p className="text-2xl font-bold text-dark">
                        (267)-635-7958
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@handymanwannabe.com"
                    className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-primary/10 p-4 rounded-full mr-6">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Email Address
                      </p>
                      <p className="text-xl font-bold text-dark">
                        info@handymanwannabe.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
                    <div className="bg-primary/10 p-4 rounded-full mr-6">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Office Location
                      </p>
                      <p className="text-xl font-bold text-dark">
                        Doylestown,PA
                      </p>
                      <p className="text-gray-600">Greater Metropolitan Area</p>
                    </div>
                  </div>

                  <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
                    <div className="bg-primary/10 p-4 rounded-full mr-6">
                      <Clock className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Business Hours
                      </p>
                      <p className="text-lg font-bold text-dark">
                        Friday-Saturday
                      </p>
                      <p className="text-gray-600">7:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                  >
                    <span className="font-bold text-lg">{faq.question}</span>
                    {activeIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Need Assistance? We're Here to Help!
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team is ready to assist you with any questions or service
              requests.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href="tel:2676357958"
                className="bg-white text-primary font-bold text-xl px-12 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                <Phone className="w-6 h-6 mr-2" />
                Call Us Now
              </a>
              <button className="bg-primary text-white font-bold text-xl px-12 py-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center">
                <MessageSquare className="w-6 h-6 mr-2" />
                Live Chat
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50">
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ContactPage;
