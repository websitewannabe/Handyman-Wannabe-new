
import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Star, ChevronDown, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import servicesData from '../data/services.json';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  image: string;
  features: string[];
  popular: boolean;
  price: string;
  timeEstimate: string;
}

const services = [
  'Outlet Repair',
  'Custom Shelving',
  'Leak Repair',
  'Door Installation',
  'Ceiling Fan Mounting',
  'Cabinet Repair',
  'Drywall Patching',
  'Furniture Assembly'
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState<'idle' | 'available' | 'unavailable'>('idle');
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
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
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredServices = servicesData.filter(service => 
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filteredServices.slice(0, 5)); // Limit to 5 results
  }, [searchQuery]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') return;
    
    // If we have results and user submits, select the first result
    if (searchResults.length > 0) {
      setSelectedService(searchResults[0]);
    } else {
      // Redirect to service directory with search query
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
    
    setShowResults(false);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setSearchQuery(service.name);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://as2.ftcdn.net/v2/jpg/02/68/88/15/1000_F_268881530_cBSYpYQtlhpzMAU5OCXPqSDkXQZz8yHb.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="mb-6">
            <span className="block mb-2">
              <span className="text-primary font-extrabold">Professional </span>
              <span className="text-primary font-extrabold">Handymen</span>
            </span>
            for Every Home Project
          </h1>
          <p className="text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
            Expert craftsmen ready to tackle any home improvement task with precision and care. Available 24/7 for your convenience.
          </p>
          
          <div 
            ref={searchRef}
            className="max-w-md mx-auto mb-12 relative"
          >
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search for... ${services[currentServiceIndex]}`}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
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
            
            {/* Dropdown results */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  <ul>
                    {searchResults.map((service) => (
                      <li 
                        key={service.id}
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleServiceSelect(service)}
                      >
                        <div className="p-3 flex items-center">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-3">
                            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{service.name}</p>
                            <p className="text-sm text-gray-500">{service.category}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="flex items-center bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              <Phone className="w-5 h-5 mr-2" />
              <span className="font-bold">Call for Quote</span>
            </button>
            <button className="flex items-center bg-transparent text-white border-2 border-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <span className="font-bold">Schedule Service</span>
            </button>
          </div>
        </div>
      </div>

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
              onClick={e => e.stopPropagation()}
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
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold">{selectedService.name}</h3>
                  <p className="text-sm text-white/90">{selectedService.category} • {selectedService.subcategory}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6">{selectedService.description}</p>

                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3">Features</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                      <span className="font-bold">Time Estimate</span>
                    </div>
                    <p className="text-gray-700">{selectedService.timeEstimate}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    Book Now
                  </button>
                  <button className="flex-1 border border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary/10 transition-colors">
                    Request Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
