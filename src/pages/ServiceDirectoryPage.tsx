
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid as GridIcon, List, Filter, Star, ChevronDown, ChevronUp, Clock, DollarSign, MessageSquare, Check } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<{[key: string]: string[]}>({
    categories: initialCategory ? [initialCategory] : [],
    subcategories: [],
    popular: [],
    priceRange: []
  });
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Dynamically extract filter options from service data
  const filterOptions = useMemo(() => {
    const categories = [...new Set(servicesData.map(service => service.category))].sort();
    const subcategories = [...new Set(servicesData.map(service => service.subcategory))].sort();
    
    // Create price ranges
    const priceRanges = ["Budget-Friendly", "Mid-Range", "Premium"];
    
    return {
      categories,
      subcategories,
      popular: ["Popular Services"],
      priceRange: priceRanges
    };
  }, []);

  // Filter services based on active filters and search query
  const filteredServices = useMemo(() => {
    return servicesData.filter(service => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filters
      const categoryFilter = activeFilters.categories.length === 0 || 
        activeFilters.categories.includes(service.category);
      
      // Subcategory filters
      const subcategoryFilter = activeFilters.subcategories.length === 0 || 
        activeFilters.subcategories.includes(service.subcategory);
      
      // Popular filter
      const popularFilter = activeFilters.popular.length === 0 || 
        (activeFilters.popular.includes("Popular Services") && service.popular);
      
      // Price range filter
      const priceFilter = activeFilters.priceRange.length === 0 || 
        (activeFilters.priceRange.includes("Budget-Friendly") && service.price.includes("From $") && parseInt(service.price.replace(/\D/g, '')) < 150) ||
        (activeFilters.priceRange.includes("Mid-Range") && service.price.includes("From $") && parseInt(service.price.replace(/\D/g, '')) >= 150 && parseInt(service.price.replace(/\D/g, '')) < 300) ||
        (activeFilters.priceRange.includes("Premium") && service.price.includes("From $") && parseInt(service.price.replace(/\D/g, '')) >= 300);
      
      return matchesSearch && categoryFilter && subcategoryFilter && popularFilter && priceFilter;
    });
  }, [searchQuery, activeFilters]);

  // Toggle filter selection
  const toggleFilter = (filterType: string, value: string) => {
    setActiveFilters(prev => {
      const currentFilters = [...(prev[filterType] || [])];
      
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterType]: currentFilters.filter(filter => filter !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentFilters, value]
        };
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      categories: [],
      subcategories: [],
      popular: [],
      priceRange: []
    });
    setSearchQuery('');
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(activeFilters).some(filters => filters.length > 0) || searchQuery !== '';

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Page header */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Service Directory</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Browse our complete selection of services or filter by category to find exactly what you need.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-grow w-full">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <button 
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setViewMode('grid')}
              >
                <GridIcon size={20} />
              </button>
              <button 
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="px-4 py-2 text-sm bg-red-50 text-red-700 rounded-full flex items-center gap-2 hover:bg-red-100 transition"
              >
                <X size={16} />
                Clear all filters
              </button>
            )}
            
            {Object.entries(activeFilters).flatMap(([filterType, values]) => 
              values.map(value => (
                <div 
                  key={`${filterType}-${value}`} 
                  className="px-4 py-2 text-sm bg-primary/10 text-primary rounded-full flex items-center gap-2"
                >
                  {value}
                  <button onClick={() => toggleFilter(filterType, value)}>
                    <X size={16} className="hover:text-primary-dark" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Categories Filter */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setExpandedFilter(expandedFilter === 'categories' ? null : 'categories')}
              >
                <span>Categories</span>
                {expandedFilter === 'categories' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {expandedFilter === 'categories' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 max-h-60 overflow-y-auto filter-scroll">
                      {filterOptions.categories.map(category => (
                        <label key={category} className="flex items-center gap-2 py-1 cursor-pointer">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              checked={activeFilters.categories.includes(category)}
                              onChange={() => toggleFilter('categories', category)}
                            />
                            <Check className="absolute h-4 w-4 text-white invisible peer-checked:visible left-0.5" />
                          </div>
                          <span className="text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subcategories Filter */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setExpandedFilter(expandedFilter === 'subcategories' ? null : 'subcategories')}
              >
                <span>Subcategories</span>
                {expandedFilter === 'subcategories' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {expandedFilter === 'subcategories' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 max-h-60 overflow-y-auto filter-scroll">
                      {filterOptions.subcategories.map(subcategory => (
                        <label key={subcategory} className="flex items-center gap-2 py-1 cursor-pointer">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              checked={activeFilters.subcategories.includes(subcategory)}
                              onChange={() => toggleFilter('subcategories', subcategory)}
                            />
                            <Check className="absolute h-4 w-4 text-white invisible peer-checked:visible left-0.5" />
                          </div>
                          <span className="text-sm text-gray-700">{subcategory.replace(/-/g, ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Popular Filter */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setExpandedFilter(expandedFilter === 'popular' ? null : 'popular')}
              >
                <span>Popular Services</span>
                {expandedFilter === 'popular' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {expandedFilter === 'popular' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50">
                      {filterOptions.popular.map(option => (
                        <label key={option} className="flex items-center gap-2 py-1 cursor-pointer">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              checked={activeFilters.popular.includes(option)}
                              onChange={() => toggleFilter('popular', option)}
                            />
                            <Check className="absolute h-4 w-4 text-white invisible peer-checked:visible left-0.5" />
                          </div>
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Range Filter */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setExpandedFilter(expandedFilter === 'priceRange' ? null : 'priceRange')}
              >
                <span>Price Range</span>
                {expandedFilter === 'priceRange' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {expandedFilter === 'priceRange' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50">
                      {filterOptions.priceRange.map(range => (
                        <label key={range} className="flex items-center gap-2 py-1 cursor-pointer">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              checked={activeFilters.priceRange.includes(range)}
                              onChange={() => toggleFilter('priceRange', range)}
                            />
                            <Check className="absolute h-4 w-4 text-white invisible peer-checked:visible left-0.5" />
                          </div>
                          <span className="text-sm text-gray-700">{range}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
          </h2>
        </div>
      </div>

      {/* Service listings */}
      <div className="container mx-auto px-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map(service => (
              <div 
                key={service.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="relative h-48 w-full">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow">
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
                  <div className="mt-auto">
                    <button className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover"
                    />
                    {service.popular && (
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-[#1B4332]">{service.name}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="w-4 h-4 text-primary mr-1" />
                            {service.price}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-primary mr-1" />
                            {service.timeEstimate}
                          </div>
                        </div>
                        <ul className="space-y-2 mb-6">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <Star className="w-4 h-4 text-primary mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto pt-4">
                        <button className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition"
                  onClick={() => setSelectedService(null)}
                >
                  <X size={24} />
                </button>
                {selectedService.popular && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-[#1B4332]">{selectedService.name}</h2>
                <p className="text-gray-700 mb-6">{selectedService.description}</p>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">CATEGORY</h3>
                    <p className="text-gray-900">{selectedService.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">PRICE</h3>
                    <p className="text-gray-900">{selectedService.price}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">TIME ESTIMATE</h3>
                    <p className="text-gray-900">{selectedService.timeEstimate}</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-4">Features & Benefits</h3>
                <ul className="space-y-3 mb-8">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                    Book This Service
                  </button>
                  <button className="bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <MessageSquare size={18} />
                    Ask a Question
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

export default ServiceDirectoryPage;
