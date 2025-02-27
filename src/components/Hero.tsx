import React, { useState, useEffect } from 'react';
import { Search, Phone } from 'lucide-react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate service search
    setSearchStatus(Math.random() > 0.3 ? 'available' : 'unavailable');
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
            className="max-w-md mx-auto mb-12"
          >
            <div className="relative">
              <input
                type="text"
                placeholder={`Search for... ${services[currentServiceIndex]}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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