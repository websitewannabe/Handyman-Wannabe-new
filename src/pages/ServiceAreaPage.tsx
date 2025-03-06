import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Search,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const regions = [
  {
    name: "El Paso County",
    areas: [
      "Fountain, CO",
      "Monument, CO",
      "Falcon, 80831, CO",
      "Peyton, 80831, CO",
      "Colorado Springs, CO",
    ],
    coverage: "Full Service",
  },
  {
    name: "Douglas County",
    areas: ["Larkspur, 80118, CO"],
    coverage: "Full Service",
  },
  {
    name: "Teller County",
    areas: ["Green Mountain Falls, CO", "Manitou Springs, 80829, CO"],
    coverage: "Full Service",
  },
];

const faqs = [
  {
    question: "Do you charge extra for areas outside the main service region?",
    answer:
      "A small travel fee may apply for locations outside our primary service area. The exact fee will be calculated and disclosed before scheduling your service.",
  },
  {
    question: "How can I request service if I'm not in a listed area?",
    answer:
      "Please contact our customer service team directly. We evaluate out-of-area requests on a case-by-case basis and may be able to accommodate your needs.",
  },
  {
    question: "What is your service radius from your main location?",
    answer:
      "We typically service within a 50-mile radius of our main office. However, we can often accommodate requests beyond this range for larger projects.",
  },
];

const ServiceAreaPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "available" | "unavailable"
  >("idle");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate ZIP code validation
    const isValidZip = /^\d{5}$/.test(searchQuery);
    if (!isValidZip) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }
    // Simulate service area check
    setSearchStatus(Math.random() > 0.3 ? "available" : "unavailable");
  };

  return (
    <div className="pt-28">
      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Our Service Coverage</h1>
              <p className="text-xl text-gray-600">
                Explore our service areas and coverage details
              </p>
            </div>

            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter ZIP Code"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary text-lg border border-gray-300"
                  maxLength={5}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {searchStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center mb-12 inline-flex items-center px-6 py-3 rounded-lg ${
                  searchStatus === "available"
                    ? "bg-green-500/20 text-green-700"
                    : "bg-red-500/20 text-red-700"
                }`}
              >
                {searchStatus === "available" ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 mr-2" />
                    Great news! We service your area. Request service now!
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 mr-2" />
                    Sorry, we don't currently service your area. Please contact
                    us for options.
                  </>
                )}
              </motion.div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?AIzaSyCOzVv_UNAmpazz8SI-GcPy0Kh4BT989wA"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Service Area Map"
                ></iframe>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regions.map((region) => (
                  <motion.div
                    key={region.name}
                    className="bg-gray-50 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        setActiveRegion(
                          activeRegion === region.name ? null : region.name,
                        )
                      }
                    >
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-primary mr-2" />
                        <span className="font-bold">{region.name}</span>
                      </div>
                      {activeRegion === region.name ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {activeRegion === region.name && (
                      <div className="px-6 py-4 bg-white">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            Coverage:
                          </span>
                          <span className="ml-2 text-primary font-medium">
                            {region.coverage}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {region.areas.map((area) => (
                            <li
                              key={area}
                              className="text-gray-600 flex items-center"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                  >
                    <span className="font-bold text-lg text-gray-900">
                      {faq.question}
                    </span>
                    {activeFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {activeFaq === index && (
                    <div className="px-6 py-4 bg-white">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Green CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you with your home improvement needs. Our expert team
              is ready to serve you!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="bg-white text-primary font-bold text-xl px-12 py-4 rounded-lg hover:bg-gray-100 transition-colors">
                Schedule Service
              </button>
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

export default ServiceAreaPage;
