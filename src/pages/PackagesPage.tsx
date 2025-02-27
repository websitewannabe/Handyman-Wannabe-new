import React from 'react';
import { motion } from 'framer-motion';
import { Star, Package, Shield, ThumbsUp, Phone, MessageSquare, ChevronDown, ChevronUp, ClipboardList, UserCheck, Calendar, ChevronRight, Home, Wrench, Gift, Settings, Lightbulb, PenTool as Tool } from 'lucide-react';
import { Link } from 'react-router-dom';

const packages = [
  {
    id: 'essential-home',
    title: 'Essential Home Maintenance',
    description: 'A comprehensive bundle of essential home repairs and upkeep services.',
    image: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 'From $299/month',
    services: [
      'Electrical safety check & minor repairs',
      'Plumbing maintenance (leak checks, faucet adjustments)',
      'Powerwashing for driveways and walkways',
      'Seasonal HVAC filter replacement'
    ],
    bestFor: 'Homeowners looking for affordable routine maintenance',
    popular: true,
    icon: Home
  },
  {
    id: 'property-manager',
    title: 'Property Manager Package',
    description: 'A recurring service package designed for rental property maintenance.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 'From $499/month',
    services: [
      'Unit turnover maintenance (painting, repairs)',
      'Appliance inspections & minor fixes',
      'Landscaping touch-ups & exterior upkeep',
      'Emergency handyman response service'
    ],
    bestFor: 'Property managers and landlords needing consistent upkeep',
    popular: false,
    icon: Tool
  },
  {
    id: 'seasonal-prep',
    title: 'Seasonal Prep Package',
    description: 'Comprehensive seasonal maintenance to prepare your home for changing weather.',
    image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 'From $399/season',
    services: [
      'Gutter cleaning and roof inspection',
      'Caulking and weatherproofing doors & windows',
      'Outdoor furniture setup & takedown',
      'Holiday lighting installation/removal'
    ],
    bestFor: 'Homeowners preparing for winter, summer, or storm season',
    popular: false,
    icon: Calendar
  },
  {
    id: 'smart-security',
    title: 'Smart Home & Security',
    description: 'Upgrade and secure your home with smart technology solutions.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 'From $599',
    services: [
      'Smart lock & video doorbell installation',
      'Security camera setup & configuration',
      'Smart thermostat installation & integration',
      'Motion sensor lighting installation'
    ],
    bestFor: 'Homeowners wanting modern security & home automation',
    popular: true,
    icon: Lightbulb
  },
  {
    id: 'custom-bundle',
    title: 'Custom Package',
    description: 'Build your own service bundle with our most popular offerings.',
    image: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 'Custom Pricing',
    services: [
      'Choose any combination of services',
      'Flexible scheduling options',
      'Priority service scheduling',
      'Bundled service discounts'
    ],
    bestFor: 'Those needing custom handyman services at a discounted rate',
    popular: false,
    icon: Settings
  }
];

const PackagesPage = () => {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(240, 90, 39, 0.8)' }}></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Service Packages
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-6 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Save time and money with our bundled service packages. Whether you need multiple repairs, seasonal maintenance, or ongoing property care, we have a package tailored for you.
          </motion.p>
          <motion.button
            className="bg-white text-secondary font-bold text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 rounded-lg hover:bg-gray-100 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            View Packages
          </motion.button>
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

      {/* Overview Section */}
      <section className="py-20" style={{ backgroundColor: '#ebd5c1' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl font-bold mb-6 text-[#1B4332]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Why Choose Our Packages?
              </motion.h2>
              <motion.p
                className="text-xl text-gray-800 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Handyman Wannabe offers carefully curated service packages to provide you with the best value for your home maintenance and repair needs. Whether you're a homeowner, property manager, or business owner, we have a package that fits your needs.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Package,
                    title: 'Cost Savings',
                    description: 'Get bundled services at a discounted rate'
                  },
                  {
                    icon: Calendar,
                    title: 'Convenience',
                    description: 'Book multiple services in a single visit'
                  },
                  {
                    icon: Settings,
                    title: 'Customization',
                    description: 'Choose from pre-built or custom packages'
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Available Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative h-48">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Popular Choice
                    </div>
                  )}
                  <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                    {pkg.title}
                  </h3>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <pkg.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold text-primary">{pkg.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {pkg.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start">
                        <Star className="w-5 h-5 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto space-y-4">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="text-sm font-medium text-primary">Best For:</p>
                      <p className="text-gray-700">{pkg.bestFor}</p>
                    </div>
                    <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
                      Choose Package
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get started with your service package in just a few simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Package,
                title: "Choose a Package",
                description: "Select the package that best fits your needs."
              },
              {
                icon: UserCheck,
                title: "Get Matched",
                description: "Connect with our professional service team."
              },
              {
                icon: Calendar,
                title: "Schedule Services",
                description: "Pick convenient times for your services."
              },
              {
                icon: Star,
                title: "Enjoy & Save",
                description: "Experience quality service and great savings."
              }
            ].map((step, index, array) => (
              <React.Fragment key={index}>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 relative border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-white text-secondary rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="mb-4 text-white">
                    <step.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-white/80">{step.description}</p>

                  {index < array.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-8 h-8 text-white" />
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Can I customize a package to fit my needs?",
                answer: "Yes! Our Custom Package option allows you to select the specific services you need. We'll help you build a package that perfectly matches your requirements while still providing bundle savings."
              },
              {
                question: "How much can I save with a package?",
                answer: "Package savings typically range from 10-20% compared to booking individual services. The exact savings depend on the package and services selected, with larger packages offering greater discounts."
              },
              {
                question: "Do packages include emergency services?",
                answer: "Yes, some packages like our Property Manager Package include priority emergency service. For other packages, emergency services can be added as an optional upgrade."
              },
              {
                question: "How do I schedule services within my package?",
                answer: "After selecting your package, you'll have access to our online scheduling system where you can book services at your convenience. Our team will help coordinate the timing of multiple services for maximum efficiency."
              },
              {
                question: "Are packages available for businesses?",
                answer: "Yes! We offer customized service packages for businesses of all sizes. Our commercial packages can be tailored to meet your specific maintenance and repair needs while providing significant cost savings."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-bold text-lg">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Save with a Package?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose a service package today and start saving on your home maintenance needs!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-white text-primary font-bold text-xl px-12 py-4 rounded-lg hover:bg-gray-100 transition-colors">
              View All Packages
            </button>
            <a
              href="tel:7193156628"
              className="flex items-center text-2xl font-bold hover:text-white/90 transition-colors"
            >
              <Phone className="w-6 h-6 mr-2" />
              (719) 315-6628
            </a>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50">
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};

export default PackagesPage;