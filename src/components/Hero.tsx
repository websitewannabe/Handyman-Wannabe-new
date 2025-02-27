import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, X, DollarSign, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import servicesData from '../data/services.json';

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
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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
      setFilteredServices([]);
      setIsDropdownVisible(false);
      return;
    }

    const filtered = servicesData.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Limit to 5 results
    
    setFilteredServices(filtered);
    setIsDropdownVisible(filtered.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    // Close modal when clicking outside
    const handleModalClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleModalClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleModalClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    
    // Navigate to service directory with search query if no specific service selected
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSelectService = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
    setSearchQuery('');
    setIsDropdownVisible(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          
          <div 
            className="max-w-md mx-auto mb-12 relative"
            style={{ position: 'relative', zIndex: 9000 }}
            ref={searchRef}
          >
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search for... ${services[currentServiceIndex]}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsDropdownVisible(filteredServices.length > 0)}
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
              <div className="absolute mt-2 w-full bg-white shadow-xl rounded-lg overflow-hidden search-dropdown">
                <ul>
                  {filteredServices.slice(0, 3).map((service) => (
                    <li 
                      key={service.id} 
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleSelectService(service)}
                    >
                      <div>
                        <p className="font-medium text-gray-800">{service.name}</p>
                        <p className="text-sm text-gray-500">{service.category}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Service Modal */}
            {isModalOpen && selectedService && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div 
                  ref={modalRef}
                  className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <button 
                      onClick={closeModal}
                      className="absolute right-4 top-4 bg-white/80 rounded-full p-1 backdrop-blur-sm z-10 hover:bg-white transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-800" />
                    </button>
                    
                    {selectedService.image && (
                      <div className="h-48 sm:h-64 overflow-hidden">
                        <img 
                          src={selectedService.image} 
                          alt={selectedService.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedService.name}</h2>
                    <p className="text-gray-600 mb-6">{selectedService.description}</p>
                    
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
                          <span className="font-bold">Estimated Time</span>
                        </div>
                        <p className="text-gray-700">{selectedService.timeEstimate}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">Features</h3>
                      <ul className="space-y-2">
                        {selectedService.features.map((feature: string, index: number) => (
                          <li key={index} className="flex text-gray-700">
                            <Star className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button 
                      className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Book This Service
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {searchStatus !== 'idle' && (
            <div
              className={`inline-flex items-center px-6 py-3 rounded-lg mb-12 ${
                searchStatus === 'available' 
                  ? 'bg-green-500/20 text-green-100' 
                  : 'bg-red-500/20 text-red-100'
              }`}
            >
              {searchStatus === 'available' ? (
                'Great! We offer this service. Request a quote now!'
              ) : (
                'Sorry, we don\'t currently offer this service. Please try another search.'
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg">
              Get an Instant Quote
            </button>
          </div>
        </div>
      </div>

      {/* Wave transition section */}
      <div className="absolute -bottom-1 left-0 right-0 z-20">
        {/* Main colored wave */}
        <svg
          className="w-full relative"
          style={{ height: '120px', color: '#ebd5c1' }}
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M 0,60 C 150,60 200,100 300,100 C 400,100 500,40 600,40 C 700,40 800,100 900,100 C 1000,100 1050,60 1200,60 L 1200,120 L 0,120 Z" />
        </svg>
      </div>

      {/* Background color section */}
      <div className="absolute -bottom-32 left-0 right-0 h-32" style={{ backgroundColor: '#ebd5c1' }}></div>
    </div>
  );
};

export default Hero;