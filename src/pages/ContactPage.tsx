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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <strong>Thank you!</strong> Your message has been {window.location.hostname === 'localhost' || window.location.hostname.includes('replit') ? 'processed (development mode)' : 'sent successfully'}. We'll get back to you soon!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <strong>Error:</strong> There was an issue sending your message. Please try again.
                  </div>
                )}
                
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  netlify-honeypot="bot-field"
                  className="space-y-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setSubmitStatus('idle');
                    
                    const formData = new FormData(e.currentTarget);
                    
                    try {
                      // Check if we're in development mode
                      const isDevelopment = window.location.hostname === 'localhost' || 
                                          window.location.hostname.includes('replit');
                      
                      if (isDevelopment) {
                        // In development, simulate successful submission after delay
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        setSubmitStatus('success');
                        e.currentTarget.reset();
                        console.log('Form data (development mode):', Object.fromEntries(formData));
                      } else {
                        // In production, use normal Netlify form submission
                        const response = await fetch('/', {
                          method: 'POST',
                          headers: { "Content-Type": "application/x-www-form-urlencoded" },
                          body: new URLSearchParams(formData as any).toString()
                        });
                        
                        if (response.ok) {
                          setSubmitStatus('success');
                          e.currentTarget.reset();
                        } else {
                          setSubmitStatus('error');
                        }
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      setSubmitStatus('error');
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  {/* Hidden fields for Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      >
                        <option value="">Select a category</option>
                        <option value="general-request">General Request</option>
                        <option value="feedback">Feedback</option>
                        <option value="inquiry">Inquiry</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Please describe your project or inquiry in detail..."
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
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
