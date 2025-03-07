import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Phone,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { pageSEOData, getCanonicalUrl } from "../utils/seoHelpers";

// Memoized service area zip codes to avoid re-creation on each render
const servicedZipCodes = [
  "80817", "80118", "80132", "80133", "80921", "80831", "80902",
  "80903", "80904", "80905", "80906", "80907", "80908", "80909",
  "80910", "80911", "80913", "80915", "80916", "80917", "80918",
  "80919", "80920", "80922", "80923", "80924", "80925", "80926",
  "80927", "80928", "80929", "80930", "80938", "80939", "80951",
  "80829", "80819",
];

// Pre-defined regions for display
const regions = [
  {
    name: "El Paso County",
    description: "Serving all major areas including Colorado Springs, Monument, Fountain, and more.",
    areas: ["Colorado Springs", "Monument", "Fountain", "Falcon", "Peyton"],
  },
  {
    name: "Douglas County",
    description: "Limited service in select areas of Douglas County.",
    areas: ["Larkspur"],
  },
  {
    name: "Teller County",
    description: "Serving select areas in Teller County.",
    areas: ["Green Mountain Falls", "Manitou Springs"],
  },
];

// FAQ data
const faqData = [
  {
    question: "Do you charge extra for travel outside of Colorado Springs?",
    answer: "For locations within our service area but outside Colorado Springs, a small travel fee may apply. This fee is calculated based on distance and will be disclosed before scheduling your service.",
  },
  {
    question: "How quickly can you respond to service requests?",
    answer: "Our standard response time is 24-48 hours for most service requests. For emergency services, we offer expedited scheduling with same-day service when available.",
  },
  {
    question: "Do you serve commercial properties?",
    answer: "Yes, we provide services for both residential and commercial properties throughout our service area. Commercial clients receive the same high-quality service with specialized scheduling options.",
  },
  {
    question: "What if my area isn't listed in your service regions?",
    answer: "We may still be able to accommodate your request. Please contact us directly to discuss your specific location, and we'll let you know if service is available.",
  },
];

const ServiceAreaPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState<"idle" | "available" | "unavailable">("idle");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // SEO data
  const seoData = useMemo(() => pageSEOData.serviceArea || {
    title: "Service Areas - Handyman Wannabe",
    description: "Find out if Handyman Wannabe serves your area. We provide professional handyman services throughout Colorado Springs and surrounding areas.",
    keywords: "handyman service area, Colorado Springs handyman, El Paso County services, local handyman",
    featuredImage: "/images/service-area-map.jpg",
    path: "/service-area",
  }, []);

  // Memoized toggle functions to prevent recreating on every render
  const toggleRegion = useCallback((region: string) => {
    setActiveRegion(activeRegion === region ? null : region);
  }, [activeRegion]);

  const toggleFaq = useCallback((index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  }, [activeFaq]);

  // Handle ZIP code search with proper validation
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    // Validate ZIP code format
    const isValidZip = /^\d{5}$/.test(searchQuery);
    if (!isValidZip) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    // Check if ZIP code is in our service area
    const isServicedArea = servicedZipCodes.includes(searchQuery);
    setSearchStatus(isServicedArea ? "available" : "unavailable");
  }, [searchQuery, servicedZipCodes]);

  // Memoized search results to prevent unnecessary recalculations
  const searchResults = useMemo(() => {
    if (searchStatus === "idle") return null;

    return (
      <div className="mt-6 p-4 rounded-lg text-center">
        {searchStatus === "available" ? (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-green-800 font-bold text-lg mb-2">
              Good news! We serve your area.
            </p>
            <p className="text-green-700">
              ZIP code {searchQuery} is within our service area. You can schedule service with us!
            </p>
            <button className="mt-4 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">
              Schedule Service Now
            </button>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <p className="text-amber-800 font-bold text-lg mb-2">
              We don't currently serve your area.
            </p>
            <p className="text-amber-700">
              Unfortunately, ZIP code {searchQuery} is outside our current service area.
            </p>
            <p className="mt-2 text-amber-700">
              Please contact us to see if we can make accommodations or to be notified when we expand to your area.
            </p>
            <a
              href="tel:7193156628"
              className="mt-4 inline-block bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        )}
      </div>
    );
  }, [searchQuery, searchStatus]);

  return (
    <div className="pt-28">
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        featuredImage={seoData.featuredImage}
        canonicalUrl={getCanonicalUrl(seoData.path)}
      />

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

            {searchResults}

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207019.11336308766!2d-104.9200903957284!3d38.87345444651031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713412ea1e6d22b%3A0x418eeb92f5e86b13!2sColorado%20Springs%2C%20CO!5e0!3m2!1sen!2sus!4v1666123456789!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Service Area Map"
                ></iframe>
              </div>

              <div className="space-y-4">
                {regions.map((region) => (
                  <motion.div
                    key={region.name}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleRegion(region.name)}
                    >
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-primary mr-2" />
                        <span className="font-bold text-lg">{region.name}</span>
                      </div>
                      {activeRegion === region.name ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {activeRegion === region.name && (
                      <div className="px-6 py-4 bg-white">
                        <p className="text-gray-700 mb-4">{region.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {region.areas.map((area) => (
                            <div
                              key={area}
                              className="bg-gray-50 rounded-md px-3 py-2 text-sm font-medium text-gray-700"
                            >
                              {area}
                            </div>
                          ))}
                        </div>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-bold text-lg">{faq.question}</span>
                    {activeFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {activeFaq === index && (
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-700">{faq.answer}</p>
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

export default React.memo(ServiceAreaPage);