
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid as GridIcon, List, Filter, Star, ChevronDown, ChevronUp, Clock, DollarSign, MessageSquare, X } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import servicesData from "../data/services.json";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>(category ? [category] : []);
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Initialize with URL parameters
  useEffect(() => {
    if (category) {
      setActiveCategories([category]);
    }
    if (searchQuery) {
      setLocalSearchQuery(searchQuery);
    }
  }, [category, searchQuery]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    // Update category parameter
    if (activeCategories.length === 1) {
      params.set('category', activeCategories[0]);
    } else if (activeCategories.length === 0) {
      params.delete('category');
    }
    
    // Update search parameter
    if (localSearchQuery) {
      params.set('search', localSearchQuery);
    } else {
      params.delete('search');
    }
    
    setSearchParams(params);
  }, [activeCategories, localSearchQuery]);

  // Group all service subcategories by their main category
  const categoryStructure = React.useMemo(() => {
    const structure: Record<string, string[]> = {};
    
    (servicesData as Service[]).forEach(service => {
      if (!structure[service.category]) {
        structure[service.category] = [];
      }
      
      if (!structure[service.category].includes(service.subcategory)) {
        structure[service.category].push(service.subcategory);
      }
    });
    
    return structure;
  }, []);

  // Additional filters
  const filterCategories = {
    'Price Range': ['Budget-Friendly', 'Mid-Range', 'Premium'],
    'Time Required': ['Quick (< 2 hours)', 'Standard (2-4 hours)', 'Extended (> 4 hours)'],
    'Popular Services': ['Most Requested', 'Seasonal']
  };

  // Filter services based on search, categories, and filters
  const filteredServices = React.useMemo(() => {
    return (servicesData as Service[]).filter(service => {
      // Search filter
      const matchesSearch = !localSearchQuery || 
                          service.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(localSearchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = activeCategories.length === 0 || 
                            activeCategories.includes(service.category) ||
                            activeCategories.includes(service.subcategory);
      
      // Additional filters
      const matchesFilters = activeFilters.length === 0 || 
                            activeFilters.some(filter => {
                              // Check if service has this feature
                              if (service.features.some(feature => feature.includes(filter))) {
                                return true;
                              }
                              
                              // Price range filter
                              if (filter === 'Budget-Friendly' && service.price.includes('From $') && parseInt(service.price.replace(/\D/g, '')) < 150) {
                                return true;
                              }
                              if (filter === 'Mid-Range' && service.price.includes('From $') && 
                                  parseInt(service.price.replace(/\D/g, '')) >= 150 && 
                                  parseInt(service.price.replace(/\D/g, '')) < 350) {
                                return true;
                              }
                              if (filter === 'Premium' && service.price.includes('From $') && parseInt(service.price.replace(/\D/g, '')) >= 350) {
                                return true;
                              }
                              
                              // Time filters
                              if (filter === 'Quick (< 2 hours)' && service.timeEstimate.includes('1-') && !service.timeEstimate.includes('10')) {
                                return true;
                              }
                              if (filter === 'Standard (2-4 hours)' && service.timeEstimate.includes('2-4')) {
                                return true;
                              }
                              if (filter === 'Extended (> 4 hours)' && 
                                  (service.timeEstimate.includes('5') || 
                                   service.timeEstimate.includes('6') || 
                                   service.timeEstimate.includes('7') || 
                                   service.timeEstimate.includes('8'))) {
                                return true;
                              }
                              
                              // Popular services
                              if (filter === 'Most Requested' && service.popular) {
                                return true;
                              }
                              
                              return false;
                            });
      
      return matchesSearch && matchesCategory && matchesFilters;
    });
  }, [localSearchQuery, activeCategories, activeFilters]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search parameter
    const params = new URLSearchParams(searchParams);
    if (localSearchQuery) {
      params.set('search', localSearchQuery);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    setActiveCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Toggle additional filter
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveCategories([]);
    setActiveFilters([]);
    setLocalSearchQuery('');
    setSearchParams(new URLSearchParams());
  };

  // Toggle filter panel on mobile
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary to-secondary/80 pt-24 pb-32">
        <div className="absolute inset-0 z-10 bg-black/30"></div>
        
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
            {activeCategories.length === 1
              ? `Browse our selection of ${activeCategories[0].replace(/-/g, ' ')} services`
              : 'Explore our comprehensive range of professional services tailored to your home needs'
            }
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Wave transition */}
        <div className="absolute -bottom-1 left-0 right-0 z-20">
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
      </section>

      {/* Main Content */}
      <section className="py-8 px-4 max-w-7xl mx-auto -mt-16 relative z-30">
        {/* Filter & Sorting Controls */}
        <div className="flex flex-col lg:flex-row mb-8 gap-4">
          {/* Active Filters */}
          {(activeCategories.length > 0 || activeFilters.length > 0 || localSearchQuery) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white shadow-sm rounded-lg p-4 mb-4"
            >
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500 mr-2">Active Filters:</span>
                
                {/* Search Query Tag */}
                {localSearchQuery && (
                  <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm flex items-center">
                    Search: {localSearchQuery}
                    <button 
                      onClick={() => setLocalSearchQuery('')}
                      className="ml-2 text-secondary/70 hover:text-secondary"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {/* Category Tags */}
                {activeCategories.map(cat => (
                  <span key={cat} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                    {cat.replace(/-/g, ' ')}
                    <button 
                      onClick={() => setActiveCategories(prev => prev.filter(c => c !== cat))}
                      className="ml-2 text-primary/70 hover:text-primary"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                
                {/* Additional Filter Tags */}
                {activeFilters.map(filter => (
                  <span key={filter} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    {filter}
                    <button 
                      onClick={() => setActiveFilters(prev => prev.filter(f => f !== filter))}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                
                {/* Clear All Button */}
                <button 
                  onClick={clearAllFilters}
                  className="ml-auto text-sm text-red-500 hover:text-red-700 flex items-center"
                >
                  <X size={14} className="mr-1" /> Clear All
                </button>
              </div>
            </motion.div>
          )}

          {/* Mobile Filter Button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button
              onClick={toggleFilterPanel}
              className="bg-white shadow-sm rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
            >
              <Filter size={18} />
              <span>Filters</span>
              {isFilterPanelOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                <GridIcon size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          <motion.div 
            className={`lg:w-72 bg-white shadow-sm rounded-lg overflow-hidden ${isFilterPanelOpen || 'lg:block hidden'}`}
            animate={{ height: isFilterPanelOpen ? 'auto' : 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center justify-between">
                <span>Filters</span>
                <div className="hidden lg:flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    <GridIcon size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </h3>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {/* Categories Section */}
              <div className="mb-6">
                <button 
                  className="w-full flex items-center justify-between text-left font-semibold mb-2"
                  onClick={() => setExpandedFilter(expandedFilter === 'categories' ? null : 'categories')}
                >
                  <span>Service Categories</span>
                  {expandedFilter === 'categories' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {expandedFilter === 'categories' && (
                  <div className="pl-2 mt-2 space-y-2">
                    {Object.keys(categoryStructure).map(mainCategory => (
                      <div key={mainCategory} className="mb-3">
                        <div className="flex items-center mb-1">
                          <input
                            type="checkbox"
                            id={`category-${mainCategory}`}
                            checked={activeCategories.includes(mainCategory)}
                            onChange={() => toggleCategoryFilter(mainCategory)}
                            className="form-checkbox h-4 w-4 text-primary rounded"
                          />
                          <label htmlFor={`category-${mainCategory}`} className="ml-2 text-gray-700 font-medium">
                            {mainCategory}
                          </label>
                        </div>
                        
                        <div className="pl-6 space-y-1 mt-1">
                          {categoryStructure[mainCategory].map(subCategory => (
                            <div key={subCategory} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`subcategory-${subCategory}`}
                                checked={activeCategories.includes(subCategory)}
                                onChange={() => toggleCategoryFilter(subCategory)}
                                className="form-checkbox h-4 w-4 text-primary rounded"
                              />
                              <label htmlFor={`subcategory-${subCategory}`} className="ml-2 text-sm text-gray-600">
                                {subCategory.replace(/-/g, ' ')}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Additional Filters */}
              {Object.entries(filterCategories).map(([category, options]) => (
                <div key={category} className="mb-6">
                  <button 
                    className="w-full flex items-center justify-between text-left font-semibold mb-2"
                    onClick={() => setExpandedFilter(expandedFilter === category ? null : category)}
                  >
                    <span>{category}</span>
                    {expandedFilter === category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  {expandedFilter === category && (
                    <div className="pl-2 mt-2 space-y-2">
                      {options.map(option => (
                        <div key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`filter-${option}`}
                            checked={activeFilters.includes(option)}
                            onChange={() => toggleFilter(option)}
                            className="form-checkbox h-4 w-4 text-primary rounded"
                          />
                          <label htmlFor={`filter-${option}`} className="ml-2 text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Listings */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeCategories.length === 1 
                    ? `${activeCategories[0].replace(/-/g, ' ')} Services`
                    : 'Available Services'}
                </h2>
                <p className="text-gray-500 text-sm">{filteredServices.length} services found</p>
              </div>

              {filteredServices.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map(service => (
                      <motion.div
                        key={service.id}
                        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                        onClick={() => setSelectedService(service)}
                      >
                        <div className="relative h-48">
                          <img 
                            src={service.image} 
                            alt={service.name} 
                            className="w-full h-full object-cover"
                          />
                          {service.popular && (
                            <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                              Popular
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col h-full">
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setSelectedService(service)}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-48 md:h-auto">
                            <img 
                              src={service.image} 
                              alt={service.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 md:w-2/3 flex flex-col">
                            <div className="flex-grow">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-[#1B4332]">{service.name}</h3>
                                {service.popular && (
                                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 mb-4">{service.description}</p>
                              <ul className="space-y-2 mb-4">
                                {service.features.slice(0, 2).map((feature, index) => (
                                  <li key={index} className="flex items-center text-sm text-gray-600">
                                    <Star className="w-4 h-4 text-primary mr-2" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center text-gray-700">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{service.timeEstimate}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{service.price}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-auto pt-2">
                              <button className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                                Learn More
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No services found matching your criteria.</p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.name} 
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedService(null)}
                >
                  <X className="w-5 h-5" />
                </button>
                {selectedService.popular && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold mb-2 text-[#1B4332]">{selectedService.name}</h2>
                <div className="flex items-center text-gray-600 mb-6">
                  <span className="mr-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    {selectedService.timeEstimate}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-primary" />
                    {selectedService.price}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedService.description}</p>
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
