import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  ChevronUp,
  ChevronDown,
  Phone,
  MessageSquare,
  Search,
} from "lucide-react";

// Service area data - defined as a memoized constant to avoid re-creation
const ServiceAreaPage = () => {
  // Define states with appropriate initial values
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "available" | "unavailable"
  >("idle");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Memoize the ZIP codes to prevent recreation on each render
  const servicedZipCodes = useMemo(
    () => [
      "18036",
      "18039",
      "18041",
      "18042",
      "18054",
      "18055",
      "18073",
      "18077",
      "18081",
      "18901",
      "18902",
      "18910",
      "18911",
      "18912",
      "18913",
      "18914",
      "18916",
      "18917",
      "18920",
      "18921",
      "18922",
      "18923",
      "18925",
      "18926",
      "18927",
      "18928",
      "18929",
      "18930",
      "18931",
      "18932",
      "18933",
      "18934",
      "18935",
      "18938",
      "18940",
      "18942",
      "18943",
      "18944",
      "18946",
      "18947",
      "18949",
      "18950",
      "18951",
      "18953",
      "18954",
      "18955",
      "18956",
      "18960",
      "18962",
      "18963",
      "18966",
      "18968",
      "18969",
      "18970",
      "18972",
      "18974",
      "18976",
      "18977",
      "18980",
      "18981",
      "18991",
      "19006",
      "19007",
      "19020",
      "19021",
      "19030",
      "19040",
      "19047",
      "19048",
      "19049",
      "19053",
      "19054",
      "19055",
      "19056",
      "19057",
      "19058",
      "19067",
      "19440",
      "19454",
    ],
    [],
  );

  // Memoize region data to prevent recreation on each render
  const regionData = useMemo(
    () => [
      {
        name: "Bucks County",
        cities: [
          "Bensalem",
          "Bristol",
          "Chalfont",
          "Churchville",
          "Croydon",
          "Doylestown",
          "Dublin",
          "Fairless Hills",
          "Feasterville",
          "Hulmeville",
          "Ivyland",
          "Langhorne",
          "Langhorne Manor",
          "Levittown",
          "Morrisville",
          "New Britain",
          "New Hope",
          "Newtown",
          "Penndel",
          "Perkasie",
          "Quakertown",
          "Richboro",
          "Richlandtown",
          "Sellersville",
          "Silverdale",
          "Solebury",
          "Southampton",
          "Trevose",
          "Tullytown",
          "Upper Black Eddy",
          "Warminster",
          "Warrington",
          "Washington Crossing",
          "Yardley",
        ],
        zipCodes: [
          "18036",
          "18039",
          "18041",
          "18042",
          "18054",
          "18055",
          "18073",
          "18077",
          "18081",
          "18901",
          "18902",
          "18910",
          "18911",
          "18912",
          "18913",
          "18914",
          "18916",
          "18917",
          "18920",
          "18921",
          "18922",
          "18923",
          "18925",
          "18926",
          "18927",
          "18928",
          "18929",
          "18930",
          "18931",
          "18932",
          "18933",
          "18934",
          "18935",
          "18938",
          "18940",
          "18942",
          "18943",
          "18944",
          "18946",
          "18947",
          "18949",
          "18950",
          "18951",
          "18953",
          "18954",
          "18955",
          "18956",
          "18960",
          "18962",
          "18963",
          "18966",
          "18968",
          "18969",
          "18970",
          "18972",
          "18974",
          "18976",
          "18977",
          "18980",
          "18981",
          "18991",
          "19006",
          "19007",
          "19020",
          "19021",
          "19030",
          "19040",
          "19047",
          "19048",
          "19049",
          "19053",
          "19054",
          "19055",
          "19056",
          "19057",
          "19058",
          "19067",
          "19440",
          "19454",
        ],
      },
    ],
    [],
  );

  // FAQ data - memoized to avoid recreation
  const faqData = useMemo(
    () => [
      {
        question: "What areas do you service?",
        answer: "We currently service Bucks County.",
      },
      {
        question: "How do I know if you service my specific location?",
        answer:
          "You can check if we service your location by entering your ZIP code in the search field above. We'll instantly let you know if your area is covered by our services.",
      },
      {
        question: "Do you charge extra for service in certain areas?",
        answer:
          "While there may be a small travel fee for locations at the edges of our service area, we always disclose any additional fees upfront before scheduling your service.",
      },
      {
        question: "What if I'm just outside your service area?",
        answer:
          "If you're just outside our primary service area, please give us a call. We evaluate these requests on a case-by-case basis and may be able to accommodate your needs, especially for larger projects.",
      },
      {
        question: "Do I need to be present when you provide service?",
        answer:
          "In most cases, we require someone 18 or older to be present during service. However, for certain exterior projects, arrangements can be made. Please discuss your specific needs with our team when scheduling.",
      },
    ],
    [],
  );

  // Optimize search handler with useCallback to prevent recreation on each render
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validate ZIP code format
      const isValidZip = /^\d{5}$/.test(searchQuery);
      if (!isValidZip) {
        alert("Please enter a valid 5-digit ZIP code");
        return;
      }

      // Check if ZIP code is in our service area - using memoized array
      const isServicedArea = servicedZipCodes.includes(searchQuery);
      setSearchStatus(isServicedArea ? "available" : "unavailable");
    },
    [searchQuery, servicedZipCodes],
  );

  // Toggle region visibility with useCallback
  const toggleRegion = useCallback((region: string) => {
    setActiveRegion((prevRegion) => (prevRegion === region ? null : region));
  }, []);

  // Toggle FAQ visibility with useCallback
  const toggleFaq = useCallback((index: number) => {
    setActiveFaq((prevFaq) => (prevFaq === index ? null : index));
  }, []);

  // Animation variants - defined outside of render to avoid recreation
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-6">Our Service Areas</h1>
            <p className="text-xl mb-8">
              Handyman Wannabe proudly serves the Bucks County area and
              surrounding communities. Check if we service your area by entering
              your ZIP code below.
            </p>

            {/* ZIP Code Search */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="flex rounded-lg overflow-hidden shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter your ZIP code"
                  className="flex-grow px-4 py-3 text-gray-800 focus:outline-none"
                  maxLength={5}
                />
                <button
                  type="submit"
                  className="bg-primary px-6 py-3 text-white flex items-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  <span>Check</span>
                </button>
              </div>
            </form>

            {/* ZIP Code Search Result */}
            {searchStatus !== "idle" && (
              <motion.div
                className={`mt-6 p-4 rounded-lg ${
                  searchStatus === "available"
                    ? "bg-green-600/50"
                    : "bg-red-600/50"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {searchStatus === "available" ? (
                  <p className="font-bold">
                    Great news! We service your area. Call us or request a quote
                    to get started.
                  </p>
                ) : (
                  <p className="font-bold">
                    We don't currently service this area. Please contact us to
                    check if special arrangements can be made.
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Map and Regions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Coverage Areas
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Region List - 2 Columns */}
              <div className="lg:col-span-2 space-y-4">
                {regionData.map((region, index) => (
                  <motion.div
                    key={region.name}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                      onClick={() => toggleRegion(region.name)}
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
                      <div className="px-6 py-4 bg-gray-50">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">
                            Cities & Areas:
                          </h4>
                          <ul className="space-y-1 text-gray-600">
                            {region.cities.map((city, cityIndex) => (
                              <li key={cityIndex}>{city}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">
                            ZIP Codes:
                          </h4>
                          <p className="text-gray-600">
                            {region.zipCodes.join(", ")}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Map - 3 Columns */}
              <div className="lg:col-span-3">
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-8">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3042.380477630182!2d-75.13336592399416!3d40.31171267145669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6a821e0d6f8bb%3A0xb7bc41c04a1b73a9!2s72%20N%20Main%20St%2C%20Doylestown%2C%20PA%2018901!5e0!3m2!1sen!2sus!4v1745934345250!5m2!1sen!2sus"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Service Area Map"
                    ></iframe>
                  </div>
                  <p className="text-gray-600">
                    Our service areas focus on the Doylestown area in Bucks
                    County. Use the ZIP code checker above to confirm service at
                    your specific location.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
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
                  {activeFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-6 py-4 bg-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
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
              <a
                href="https://carpet-quote-pro-ctierney1.replit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary font-bold text-xl px-12 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-block"
              >
                Get an Instant Quote
              </a>
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
