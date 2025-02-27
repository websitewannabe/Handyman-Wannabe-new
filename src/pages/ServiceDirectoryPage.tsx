import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Grid, List, X, Star, DollarSign, Clock } from 'lucide-react';
import servicesData from '../data/services.json';

// Define Service type based on data structure
type Service = {
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
};

const ServiceDirectoryPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Filter services based on search and category only
  const filteredServices = (servicesData as Service[]).filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !category || service.subcategory === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[40vh] overflow-hidden bg-[#1B4332]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
            backgroundPosition: "center 30%",
            filter: "brightness(0.6)"
          }}
        ></div>

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
              ? `Browse our selection of ${category.replace(/-/g, ' ')} services`
              : 'Explore our comprehensive range of professional services tailored to your home needs'
            }
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & View Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery('')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 mr-2">View:</span>
            <button 
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Service Cards */}
        <div className="mt-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">No services found matching your search criteria.</p>
              <button 
                className="mt-4 text-primary hover:underline"
                onClick={() => {
                  setSearchQuery('');
                }}
              >
                Reset search
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <motion.div
                  key={service.id}
                  className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-[#1B4332]">{service.name}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 2).map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
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
              {filteredServices.map(service => (
                <motion.div
                  key={service.id}
                  className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-48 md:h-auto">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <h3 className="text-xl font-bold mb-2 text-[#1B4332]">{service.name}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        {service.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <Star className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{service.price} · {service.timeEstimate}</span>
                        <button className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedService(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-64 overflow-hidden">
              <img 
                src={selectedService.image} 
                alt={selectedService.name} 
                className="w-full h-full object-cover"
              />
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
                  <p className="text-gray-700">{selectedService.timeEstimate}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-[#1B4332]">{selectedService.name}</h2>
              <p className="text-gray-600 mb-6">{selectedService.description}</p>

              <h3 className="text-lg font-semibold mb-3 text-[#1B4332]">Features & Benefits</h3>
              <ul className="space-y-3 mb-8">
                {selectedService.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-end">
                <button className="bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                  Schedule Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDirectoryPage;