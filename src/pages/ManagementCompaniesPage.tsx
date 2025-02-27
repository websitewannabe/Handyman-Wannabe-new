import React from 'react';
import { motion } from 'framer-motion';
import { Star, Building2, Shield, ThumbsUp, Phone, MessageSquare, ChevronDown, ChevronUp, ClipboardList, UserCheck, Calendar, ChevronRight, Wrench, Home, Settings, Droplet, Lock, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManagementCompaniesPage = () => {
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#1B4332]/80"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Services for Management Companies
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-6 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Reliable maintenance and repair solutions for property management companies, apartment complexes, and commercial buildings. We keep your properties running smoothly.
          </motion.p>
          <motion.button
            className="bg-primary text-white font-bold text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 rounded-lg hover:bg-primary/90 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get an Instant Quote
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="aspect-video rounded-xl overflow-hidden shadow-2xl"
              >
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0"
                  title="Property Management Services Overview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-[#1B4332]">Expert Property Management Services</h2>
                <p className="text-xl text-gray-800 mb-6">
                  Handyman Wannabe partners with management companies to provide professional maintenance and repair services for residential and commercial properties. From routine inspections to emergency repairs, our team delivers high-quality service with reliability and efficiency.
                </p>
                <p className="text-lg text-gray-700">
                  With experienced professionals and a dedicated support team, we help keep your properties in excellent condition year-round.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Property Management Services</h2>
          
          <div className="flex justify-center items-center max-w-6xl mx-auto">
            <div className="text-3xl font-bold text-center text-primary py-16">
              👉 Our Services Coming Soon!
            </div>
          </div>
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                icon: Home
              },
              {
                title: "Emergency Repair Services",
                description: "Fast response for urgent maintenance needs.",
                services: [
                  "Repair burst pipes and water leaks",
                  "Fix broken locks and security issues",
                  "Handle electrical outages",
                  "Provide temporary structural fixes"
                ],
                bestFor: "Properties needing immediate assistance",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                icon: Settings
              },
              {
                title: "Common Area Maintenance",
                description: "Maintain shared spaces in prime condition.",
                services: [
                  "Clean and repair common areas",
                  "Replace lighting fixtures",
                  "Repair mailboxes and entry gates",
                  "Ensure ADA compliance"
                ],
                bestFor: "Multi-unit building maintenance",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                icon: Brush
              },
              {
                title: "HVAC & Plumbing",
                description: "Keep systems running efficiently.",
                services: [
                  "Service HVAC filters and ducts",
                  "Fix clogged drains and leaks",
                  "Install new fixtures",
                  "Winterize plumbing systems"
                ],
                bestFor: "Regular system maintenance needs",
                image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                icon: Droplet
              },
              {
                title: "Security & Access Control",
                description: "Maintain secure entry points and systems.",
                services: [
                  "Install and maintain smart locks",
                  "Repair security gates",
                  "Replace door locks and keys",
                  "Service intercoms and cameras"
                ],
                bestFor: "Properties prioritizing security",
                image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                icon: Lock
              }
            ].map((category, index) => (
              <Link
                key={index}
                to={`/service-directory?category=${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="block"
              >
                <motion.div
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative h-48">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <ul className="space-y-2 mb-6 flex-grow">
                      {category.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-start">
                          <Star className="w-5 h-5 text-primary mt-1 mr-2 flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-primary/10 p-4 rounded-lg mt-auto">
                      <p className="text-sm font-medium text-primary">Best For:</p>
                      <p className="text-gray-700">{category.bestFor}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
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
              Get your property maintenance needs addressed in just a few simple steps. Professional service, guaranteed satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: ClipboardList,
                title: "Request a Quote",
                description: "Describe your project and get a detailed estimate."
              },
              {
                icon: UserCheck,
                title: "Get Matched",
                description: "Connect with a professional handyman for your needs."
              },
              {
                icon: Calendar,
                title: "Schedule & Complete",
                description: "Pick a convenient time and get the job done right."
              },
              {
                icon: Star,
                title: "Review & Repeat",
                description: "Share your experience and book again with ease."
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

                  {/* Add arrow after each step except the last one */}
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
                question: "Can you provide ongoing maintenance for multiple properties?",
                answer: "Yes, we offer comprehensive maintenance plans for property management companies with multiple properties. We can customize service schedules and response times to meet your specific needs."
              },
              {
                question: "Do you handle emergency repair requests?",
                answer: "Yes, we provide 24/7 emergency maintenance services for urgent issues. Our team responds quickly to minimize disruption and prevent further damage to your properties."
              },
              {
                question: "Can tenants submit maintenance requests directly?",
                answer: "We work with property managers to establish the most efficient maintenance request system. This can include direct tenant requests or centralized management through your existing system."
              },
              {
                question: "Do you offer bulk pricing for multiple service calls?",
                answer: "Yes, we offer special pricing and service packages for management companies with regular maintenance needs. We'll work with you to create a cost-effective maintenance plan."
              },
              {
                question: "What areas do you service?",
                answer: "We service properties throughout the Greater Metropolitan Area, including El Paso County, Douglas County, and Teller County. Contact us for specific coverage details."
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
          <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your Property Maintenance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert property maintenance services from our skilled professionals. Contact us today for a free quote!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-white text-primary font-bold text-xl px-12 py-4 rounded-lg hover:bg-gray-100 transition-colors">
              Get an Instant Quote
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

export default ManagementCompaniesPage;