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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};
      
      if (!response.ok) {
        throw new Error(result.error || `HTTP error! Status: ${response.status}`);
      }
      
      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitError(error.message || 'An error occurred. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitted(false);
        setSubmitError(null);
      }, 5000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
                    href="tel:7193156628"
                    className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-primary/10 p-4 rounded-full mr-6">
                      <Phone className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                      <p className="text-2xl font-bold text-dark">
                        (719) 315-6628
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
                        Colorado Springs, CO
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
                        Monday - Saturday
                      </p>
                      <p className="text-gray-600">8:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="(800) 555-1234"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Service Request">Service Request</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn-primary py-3 text-lg font-bold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {submitted && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                      Thank you! We'll get back to you as soon as possible.
                    </div>
                  )}

                  {submitError && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                      {submitError}
                    </div>
                  )}
                </form>
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
                href="tel:7193156628"
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
