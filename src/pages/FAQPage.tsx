import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  faqs: FAQ[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "What services do you offer?",
        answer:
          "We offer a comprehensive range of handyman services including electrical work, plumbing, carpentry, painting, home repairs, smart home installation, and more. Our skilled professionals can handle both small repairs and larger renovation projects.",
      },
      {
        question: "Are your handymen licensed and insured?",
        answer:
          "Yes, all our handymen are fully licensed, bonded, and insured. We maintain strict standards for our professionals and ensure they have the necessary certifications for their specialties.",
      },
      {
        question: "Do you offer same-day services?",
        answer:
          "Yes, we offer same-day services for many urgent repairs and maintenance issues. However, availability may vary based on current demand and your location. We recommend booking in advance for non-emergency services.",
      },
    ],
  },
  {
    title: "Pricing & Payments",
    faqs: [
      {
        question: "How much do handyman services cost?",
        answer:
          "Our pricing varies depending on the type of service, complexity of the job, and materials required. We provide detailed quotes before beginning any work, and our rates are competitive within the industry. You can get an instant quote through our website or by calling us.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, cash, and digital payments through services like Apple Pay and Google Pay. Payment is typically required upon completion of service.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No, we believe in transparent pricing. All costs, including materials and labor, will be clearly outlined in your quote. If additional work is required, we'll discuss it with you and get approval before proceeding.",
      },
    ],
  },
  {
    title: "Scheduling & Availability",
    faqs: [
      {
        question: "How do I schedule an appointment?",
        answer:
          "You can schedule an appointment through our website, mobile app, or by calling our customer service team. We offer flexible scheduling options, including same-day service for urgent needs.",
      },
      {
        question: "Can I reschedule or cancel my booking?",
        answer:
          "Yes, you can reschedule or cancel your appointment through our online portal or by calling us. We request at least 24 hours notice for cancellations to avoid any fees.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "We currently serve the Bucks County area. Check our Service Area page for specific coverage details.",
      },
    ],
  },
  {
    title: "Services & Work Quality",
    faqs: [
      {
        question: "What type of repairs do you handle?",
        answer:
          "We handle a wide range of repairs, from minor fixes to major renovations. This includes electrical work, plumbing, carpentry, painting, drywall repair, furniture assembly, and more. If you're unsure about a specific repair, please contact us.",
      },
      {
        question: "Do you provide warranties for your work?",
        answer:
          "Yes, we stand behind our work with a satisfaction guarantee. All our services come with a warranty, and we'll make it right if you're not completely satisfied with the results.",
      },
      {
        question: "Can I request a specific handyman?",
        answer:
          "Yes, if you've worked with one of our handymen before and would like to request them specifically, we'll do our best to accommodate your preference based on their availability.",
      },
    ],
  },
  {
    title: "Contact & Support",
    faqs: [
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach our customer support team by phone at (267)-635-7958, through our website's contact form, or via email at info@handymanwannabe.com. We're available Monday through Saturday, 8:00 AM to 6:00 PM.",
      },
      {
        question: "What should I do if I'm not satisfied with the service?",
        answer:
          "Your satisfaction is our priority. If you're not completely satisfied with our service, please contact our customer support team immediately. We'll work to resolve any issues and ensure you're happy with the results.",
      },
      {
        question: "How do I leave feedback or a review?",
        answer:
          "After your service is completed, you'll receive an email with a link to review your experience. You can also leave reviews on our Google Business page or through our website's testimonial section.",
      },
    ],
  },
];

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality can be implemented here
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleQuestion = (question: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question],
    );
  };

  const isQuestionExpanded = (question: string) =>
    expandedQuestions.includes(question);

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Find quick answers to common questions about our handyman
              services, pricing, scheduling, and more.
            </motion.p>

            <motion.form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary text-lg border border-gray-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  className="bg-gray-50 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <button
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-100 transition-colors"
                    onClick={() => toggleCategory(category.title)}
                  >
                    <h2 className="text-xl font-bold text-gray-900">
                      {category.title}
                    </h2>
                    {expandedCategory === category.title ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  {expandedCategory === category.title && (
                    <div className="px-6 pb-6">
                      <div className="space-y-4">
                        {category.faqs.map((faq, faqIndex) => (
                          <motion.div
                            key={faqIndex}
                            className="bg-white rounded-lg shadow-sm overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: faqIndex * 0.1 }}
                          >
                            <button
                              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                              onClick={() => toggleQuestion(faq.question)}
                            >
                              <span className="font-medium text-gray-900">
                                {faq.question}
                              </span>
                              {isQuestionExpanded(faq.question) ? (
                                <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              )}
                            </button>
                            {isQuestionExpanded(faq.question) && (
                              <div className="px-6 py-4 bg-gray-50">
                                <p className="text-gray-600">{faq.answer}</p>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-6">Still have questions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is here to help with
              any questions you may have.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="bg-white text-primary font-bold text-xl px-12 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                <MessageSquare className="w-6 h-6 mr-2" />
                Contact Us
              </Link>
              <a
                href="tel:7193156628"
                className="flex items-center text-2xl font-bold hover:text-white/90 transition-colors"
              >
                <Phone className="w-6 h-6 mr-2" />
                (719) 315-6628
              </a>
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

export default FAQPage;
