import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
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

const ServiceDirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    // Load services data
    setServices(servicesData);

    // Extract unique categories
    const uniqueCategories = Array.from(new Set(servicesData.map(service => service.category)));
    setCategories(uniqueCategories);
  }, []);

  // Filter services based on search and category filters
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(service.category);

    return matchesSearch && matchesFilter;
  });

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev: string[]) => 
        prev.includes(filter)
            ? prev.filter(f => f !== filter)
            : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1617104551722-3b2d51366400?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">Service Directory</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our comprehensive list of home services to find exactly what you need.
          </p>

          <div className="max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full px-5 py-3 rounded-lg text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category}
                      checked={activeFilters.includes(category)}
                      onChange={() => toggleFilter(category)}
                      className="w-4 h-4 mr-3 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor={category} className="text-gray-700 cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px] hover:shadow-lg"
                >
                  <div className="h-48 overflow-hidden">
                    {service.image && (
                      <div 
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.image})` }}
                      >
                        {service.popular && (
                          <div className="bg-primary text-white px-3 py-1 inline-block m-2 text-sm font-medium rounded">
                            Popular
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-[#1B4332]">{service.name}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto pt-4">
                      <button className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No services found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or removing filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDirectoryPage;