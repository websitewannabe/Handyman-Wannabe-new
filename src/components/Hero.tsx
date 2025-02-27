
import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import servicesData from '../data/services.json';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, DollarSign, MessageSquare, Star, X } from 'lucide-react';

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

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState<'idle' | 'available' | 'unavailable'>('idle');
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Filter services when search query changes
    if (searchQuery.trim() === '') {
      setFilteredServices([]);
      setShowDropdown(false);
      return;
    }

    const filtered = servicesData.filter(service => 
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
    
    setFilteredServices(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') return;
    
    // If only one service matches, select that service
    if (filteredServices.length === 1) {
      handleServiceSelect(filteredServices[0]);
      return;
    }
    
    // Otherwise, redirect to services page with search query
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const closeModal = () => {
    setSelectedService(null);
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
          
          <form 
            onSubmit={handleSearch}
            className="max-w-md mx-auto mb-12 relative"
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder={`Search for... ${services[currentServiceIndex]}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() !== '' && setShowDropdown(filteredServices.length > 0)}
                className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            {/* Dropdown menu */}
            {showDropdown && (
              <div 
                ref={dropdownRef} 
                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
              >
                <ul className="py-2 max-h-60 overflow-y-auto">
                  {filteredServices.map((service) => (
                    <li 
                      key={service.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-gray-800"
                      onClick={() => handleServiceSelect(service)}
                    >
                      {service.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
          
          <div className="flex items-center justify-center space-x-8 text-gray-200">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-primary" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-primary" />
              <span>Licensed Professionals</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary" />
              <span>Free Estimates</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.name} 
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={closeModal}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedService.name}</h2>
                <p className="text-gray-600 mb-4">{selectedService.description}</p>
                
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
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Features & Benefits</h3>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Request this Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
