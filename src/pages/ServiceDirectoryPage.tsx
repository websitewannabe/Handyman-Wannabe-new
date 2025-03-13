import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Grid as GridIcon,
  List,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import servicesData from "../data/services.json";

const services: Service[] = servicesData;

// Service interface definitions
interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  image: string;
  features: string[];
  popular: boolean;
  price?: string;
  timeEstimate?: string;
}

const ServiceDirectoryPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Filter services based on search and category
  const filteredServices = (servicesData as Service[]).filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !category || service.subcategory === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("images/Handyman-Hero.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(240, 90, 39, 0.4)" }}
          ></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Service Directory
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 text-white/95 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {category
              ? `Browse our selection of ${category
                  .replace(/-/g, " ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")} Services`
              : "Explore our comprehensive range of professional services tailored to your home needs"}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
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

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: "#ebd5c1" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-2">
                {category
                  ? `${category
                      .replace(/-/g, " ")
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")} Services`
                  : "All Services"}
              </h2>
              <p className="text-gray-700">
                {filteredServices.length} services available
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow text-primary" : "text-[#1B4332] hover:bg-white/50"}`}
              >
                <GridIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow text-primary" : "text-[#1B4332] hover:bg-white/50"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Services Grid/List */}
            <div className="flex-grow">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <motion.div
                      key={service.id}
                      className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="relative h-48">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        {service.popular && (
                          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            Popular
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold mb-2 text-[#1B4332]">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {service.description}
                          </p>
                          <ul className="space-y-2 mb-6">
                            {service.features
                              .slice(0, 2)
                              .map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                  <Star className="w-4 h-4 text-primary mr-2" />
                                  {feature}
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="mt-auto pt-2">
                          <button className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredServices.map((service) => (
                    <motion.div
                      key={service.id}
                      className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="p-6 flex gap-6">
                        <div className="w-48 h-32 flex-shrink-0">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold mb-2 text-[#1B4332]">
                                {service.name}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                {service.description}
                              </p>
                            </div>
                            {service.popular && (
                              <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                <Star className="w-4 h-4 mr-1" />
                                Popular
                              </div>
                            )}
                          </div>
                          <ul className="space-y-2 mb-4">
                            {service.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-center text-sm text-gray-600"
                              >
                                <Star className="w-4 h-4 text-primary mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <button className="bg-primary text-white font-bold px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                  onClick={() => setSelectedService(null)}
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
                {selectedService.popular && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Popular
                  </div>
                )}
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedService.name}
                  </h3>
                  <p className="text-white/90 text-lg">
                    {selectedService.description}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Service Details */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-primary mb-2">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span className="font-bold">Price Estimate</span>
                    </div>
                    <p className="text-gray-700">{selectedService.price}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-primary mb-2">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-bold">Duration</span>
                    </div>
                    <p className="text-gray-700">
                      {selectedService.timeEstimate}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4">What's Included</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedService.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start bg-gray-50 p-4 rounded-lg"
                      >
                        <Star className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action */}
                <div className="flex gap-4">
                  <a 
                    href="https://book.housecallpro.com/book/Handyman-Wannabe-LLC/15e9785faf164524b7cad4c718a9ea3f?hp_provider=82855cd1830743b395e62aef39c203d1&fl_provider_id=d3ZkdaY2hreE12MTBVR2UrRGHDqxlH0TCYf7rWOAj0ToniXiKhDLri1avY40-nDP7eGQazOyh0w%3D%3D"
                    className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // Prevent default behavior and manually open in new window
                      e.preventDefault();
                      const url = "https://book.housecallpro.com/book/Handyman-Wannabe-LLC/15e9785faf164524b7cad4c718a9ea3f?hp_provider=82855cd1830743b395e62aef39c203d1&fl_provider_id=d3ZkdaY2hreE12MTBVR2UrRGHDqxlH0TCYf7rWOAj0ToniXiKhDLri1avY40-nDP7eGQazOyh0w%3D%3D";
                      window.open(url, "_blank", "noopener,noreferrer");
                    }}
                  >
                    Book Now
                  </a>
                  <button className="flex-1 border-2 border-primary text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary/5 transition-colors">
                    Get a Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50">
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ServiceDirectoryPage;
