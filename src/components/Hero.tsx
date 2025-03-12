import React, { useState, useEffect, useRef } from "react";
import { Search, Phone, X, DollarSign, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import servicesData from "../data/services.json";
const services = [
  "Outlet Repair",
  "Custom Shelving",
  "Leak Repair",
  "Door Installation",
  "Ceiling Fan Mounting",
  "Cabinet Repair",
  "Drywall Patching",
  "Furniture Assembly",
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "available" | "unavailable"
  >("idle");
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Filter services based on search query
    if (searchQuery.trim() === "") {
      setFilteredServices([]);
      setIsDropdownVisible(false);
      return;
    }

    const filtered = servicesData.filter(
      (service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.features &&
          service.features.some((feature) =>
            feature.toLowerCase().includes(searchQuery.toLowerCase()),
          )),
    );

    setFilteredServices(filtered);
    setIsDropdownVisible(filtered.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    // Navigate to service directory with search query if no specific service selected
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSelectService = (service: any) => {
    setSelectedService(service);
    setSearchQuery("");
    setIsDropdownVisible(false);
    // Navigate to service page instead of opening modal
    navigate(`/services/${service.id}`);
  };

  return (
    <div className="relative">
      <div className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <img 
            src="/images/Handyman-Hero.jpeg"
            alt="Professional Handyman Services"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            fetchpriority="high"
            style={{
              maxWidth: '100%',
              height: '100%',
            }}
            onError={(e) => {
              console.error('Hero image failed to load:', e.currentTarget.src);
              // Try alternative path
              e.currentTarget.src = `${window.location.origin}/images/Handyman-Hero.jpeg`;
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Add a preloader image */}
          <link rel="preload" as="image" href="/images/Handyman-Hero.jpeg" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="block mb-2">
              <span className="text-primary font-extrabold">Professional </span>
              <span className="text-primary font-extrabold">Handymen</span>
            </span>
            for Every Home Project
          </h1>
          <p className="text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
            Locally owned and family-operated, providing expert tradesmen services turned handyman solutions.
          </p>

          <div
            className="max-w-md mx-auto mb-12 relative"
            style={{ position: "relative", zIndex: 9000 }}
            ref={searchRef}
          >
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search for... ${services[currentServiceIndex]}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() =>
                    setIsDropdownVisible(filteredServices.length > 0)
                  }
                  className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Search Results Dropdown */}
            {isDropdownVisible && (
              <div className="absolute mt-1 w-full bg-white shadow-md rounded-lg overflow-auto search-dropdown">
                <ul className="py-1">
                  {filteredServices.map((service) => (
                    <li
                      key={service.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleSelectService(service)}
                    >
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-800 text-sm truncate">
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.category}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Service search results only - modal removed */}
          </div>

          {searchStatus !== "idle" && (
            <div
              className={`inline-flex items-center px-6 py-3 rounded-lg mb-12 ${
                searchStatus === "available"
                  ? "bg-green-500/20 text-green-100"
                  : "bg-red-500/20 text-red-100"
              }`}
            >
              {searchStatus === "available"
                ? "Great! We offer this service. Request a quote now!"
                : "Sorry, we don't currently offer this service. Please try another search."}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg">
              Get an Instant Quote
            </button>
            <a 
              href="tel:7193156628"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us Directly
            </a>
          </div>
        </div>
      </div>

      {/* Wave transition section */}
      <div className="absolute -bottom-1 left-0 right-0 z-0">
        {/* Main colored wave */}
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

      {/* Background color section */}
      <div
        className="absolute -bottom-32 left-0 right-0 h-32 z-0"
        style={{ backgroundColor: "#ebd5c1" }}
      ></div>
      
      </div>
  );
};

export default Hero;
