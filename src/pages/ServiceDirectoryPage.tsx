import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid as GridIcon, List, Clock, DollarSign, MessageSquare } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import servicesData from "../data/services.json";

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
  price: string;
  timeEstimate: string;
}

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
    <div className="relative min-h-screen bg-white">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-600 to-blue-800 -z-10"></div>

      {/* Header Content */}
      <div className="container mx-auto px-4 py-8">
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

        {/* Search Bar */}
        <div className="relative z-10 max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-full shadow-xl overflow-hidden">
            <div className="flex items-center p-2">
              <div className="pl-4 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for services..."
                className="w-full px-4 py-3 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Service Listings */}
      <div className="container mx-auto px-4 py-12 -mt-16">
        <div className="bg-white rounded-xl shadow-xl p-6">
          {/* View Mode Toggle */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-600">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-2">View:</span>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                aria-label="Grid view"
              >
                <GridIcon size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Service Cards */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-6'
              }
            `}>
              {filteredServices.map((service) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedService(service)}
                  className={`
                    cursor-pointer bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all
                    ${viewMode === 'grid' 
                      ? 'rounded-xl overflow-hidden flex flex-col'
                      : 'rounded-xl overflow-hidden flex flex-col sm:flex-row'
                    }
                  `}
                >
                  <div 
                    className={`
                      relative 
                      ${viewMode === 'grid' 
                        ? 'h-48 w-full'
                        : 'h-40 sm:h-auto sm:w-48'
                      }
                    `}
                  >
                    <img 
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover"
                    />
                    {service.popular && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        <Star size={12} className="inline mr-1" />
                        Popular
                      </div>
                    )}
                  </div>

                  <div className={`
                    p-6 flex flex-col
                    ${viewMode === 'grid' ? 'flex-grow' : 'flex-grow w-full'}
                  `}>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                    <div className="mt-auto">
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Clock size={16} className="mr-2" />
                        <span>{service.timeEstimate}</span>
                        <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
                        <DollarSign size={16} className="mr-1" />
                        <span>{service.price}</span>
                      </div>

                      <button className="w-full mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center">
                        <MessageSquare size={16} className="mr-2" />
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

      {/* Service Detail Modal from original code */}
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
                    <p className="text-gray-700">{selectedService.timeEstimate}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4">What's Included</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                        <Star className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                    Book Now
                  </button>
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