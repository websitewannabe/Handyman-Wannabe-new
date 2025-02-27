
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Star, List, Grid } from 'lucide-react';
import servicesData from '../data/services.json';

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
  const initialCategory = searchParams.get('category');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Group services by subcategory to create filter options
  const subcategories = Array.from(new Set((servicesData as Service[]).map(service => service.subcategory)));
  
  // Create category map for filter display
  const categoryMap: Record<string, string> = {};
  (servicesData as Service[]).forEach(service => {
    if (!categoryMap[service.subcategory]) {
      categoryMap[service.subcategory] = service.category;
    }
  });

  // Price ranges for filtering
  const priceRanges = [
    { label: 'Budget (< $100)', filter: 'budget' },
    { label: 'Mid-range ($100-$250)', filter: 'mid-range' },
    { label: 'Premium (> $250)', filter: 'premium' }
  ];

  // Time estimates for filtering
  const timeEstimates = [
    { label: 'Quick (< 2 hours)', filter: 'quick' },
    { label: 'Standard (2-4 hours)', filter: 'standard' },
    { label: 'Extended (> 4 hours)', filter: 'extended' }
  ];

  // Filter categories
  const filterCategories = {
    'Service Type': subcategories.map(subcat => ({
      label: subcat.replace(/-/g, ' '),
      filter: subcat
    })),
    'Price Range': priceRanges,
    'Duration': timeEstimates,
    'Popular': [{ label: 'Popular Services', filter: 'popular' }]
  };

  useEffect(() => {
    // Update URL params when filters change
    if (activeFilters.length > 0) {
      // Only update the URL with category filters (subcategories)
      const categoryFilters = activeFilters.filter(filter => 
        subcategories.includes(filter)
      );
      
      if (categoryFilters.length > 0) {
        setSearchParams({ category: categoryFilters[0] });
      } else {
        setSearchParams({});
      }
    } else {
      setSearchParams({});
    }
  }, [activeFilters, setSearchParams, subcategories]);

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
  };

  // Toggle a filter
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  // Check if service matches all active filters
  const matchesFilters = (service: Service) => {
    if (activeFilters.length === 0) return true;
    
    return activeFilters.every(filter => {
      // Check for subcategory filter
      if (subcategories.includes(filter)) {
        return service.subcategory === filter;
      }
      
      // Check for price range filter
      if (filter === 'budget') {
        const price = parseInt(service.price.replace(/\D/g, ''));
        return price < 100;
      }
      if (filter === 'mid-range') {
        const price = parseInt(service.price.replace(/\D/g, ''));
        return price >= 100 && price <= 250;
      }
      if (filter === 'premium') {
        const price = parseInt(service.price.replace(/\D/g, ''));
        return price > 250;
      }
      
      // Check for time estimate filter
      if (filter === 'quick') {
        return service.timeEstimate.includes('1');
      }
      if (filter === 'standard') {
        return service.timeEstimate.includes('2') || service.timeEstimate.includes('3') || service.timeEstimate.includes('4');
      }
      if (filter === 'extended') {
        return parseInt(service.timeEstimate.split('-')[1] || service.timeEstimate.split(' ')[0]) > 4;
      }
      
      // Check for popular filter
      if (filter === 'popular') {
        return service.popular;
      }
      
      return false;
    });
  };

  // Filter services based on search and active filters
  const filteredServices = (servicesData as Service[]).filter(service => {
    const matchesSearch = searchQuery === '' || 
                         service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch && matchesFilters(service);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with gradient background */}
      <div className="relative bg-gradient-to-r from-green-800 to-green-600 py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute bottom-0 left-0 right-0 text-gray-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
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
            {initialCategory 
              ? `Browse our selection of ${initialCategory.replace(/-/g, ' ')} services`
              : 'Explore our comprehensive range of professional services tailored to your home needs'
            }
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-20">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            {/* Search input */}
            <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* View mode and filter reset */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={resetFilters}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeFilters.length > 0 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-500'
                }`}
                disabled={activeFilters.length === 0 && searchQuery === ''}
              >
                Reset Filters
              </button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                >
                  <Grid size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <List size={20} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter section */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {Object.entries(filterCategories).map(([category, filters]) => (
                <div key={category} className="relative">
                  <button
                    onClick={() => setExpandedFilter(expandedFilter === category ? null : category)}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm font-medium flex items-center"
                  >
                    {category}
                    <span className="ml-1">
                      {expandedFilter === category ? '▲' : '▼'}
                    </span>
                    {activeFilters.some(filter => 
                      filters.some(f => f.filter === filter)
                    ) && (
                      <span className="ml-1 w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </button>
                  
                  {/* Dropdown filter options */}
                  {expandedFilter === category && (
                    <div className="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-2 max-h-64 overflow-y-auto">
                      {filters.map((filter) => (
                        <div 
                          key={filter.filter} 
                          className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => toggleFilter(filter.filter)}
                        >
                          <input
                            type="checkbox"
                            checked={activeFilters.includes(filter.filter)}
                            onChange={() => {}}
                            className="h-4 w-4 text-green-600 rounded"
                          />
                          <span className="ml-2 text-sm">
                            {filter.label}
                          </span>
                          {category === 'Service Type' && (
                            <span className="ml-auto text-xs text-gray-500">
                              {categoryMap[filter.filter]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active filters display */}
          {activeFilters.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {activeFilters.map(filter => {
                // Find the label for this filter
                let label = filter.replace(/-/g, ' ');
                
                // Look for a match in any category
                Object.values(filterCategories).flat().forEach(f => {
                  if (f.filter === filter) {
                    label = f.label;
                  }
                });
                
                return (
                  <div 
                    key={filter}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <span>{label}</span>
                    <button 
                      onClick={() => toggleFilter(filter)}
                      className="ml-2 w-4 h-4 flex items-center justify-center rounded-full bg-green-200 hover:bg-green-300"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredServices.length === 0 
                ? 'No services found matching your criteria.' 
                : `Found ${filteredServices.length} service${filteredServices.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Service cards */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }>
            {filteredServices.map(service => (
              <motion.div
                key={service.id}
                className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full ${
                  viewMode === 'list' ? 'flex-row' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                onClick={() => setSelectedService(service)}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'h-48'}`}>
                  <img
                    src={service.image}
                    alt={service.name}
                    className={`w-full h-full object-cover ${viewMode === 'list' ? 'h-full' : ''}`}
                  />
                  {service.popular && (
                    <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
                      Popular
                    </div>
                  )}
                </div>
                <div className={`p-6 flex flex-col h-full ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#1B4332]">{service.name}</h3>
                      <span className="text-green-600 font-medium text-sm">{service.price}</span>
                    </div>
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
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {selectedService.name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {selectedService.description}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-gray-900">Features:</h4>
                      <ul className="mt-2 space-y-2">
                        {selectedService.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 text-primary mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h4 className="text-md font-medium text-gray-900">Price:</h4>
                        <p className="text-sm text-gray-600">{selectedService.price}</p>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-900">Time Estimate:</h4>
                        <p className="text-sm text-gray-600">{selectedService.timeEstimate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Link
                  to={`/quote?service=${selectedService.id}`}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Get a Quote
                </Link>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedService(null)}
                >
                  Close
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
