import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, UserCheck, Calendar, Star, Shield, Clock, ThumbsUp, Phone, ArrowRight, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const testimonials = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    text: 'The booking process was incredibly smooth, and the handyman did an excellent job with our kitchen cabinet repairs.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    role: 'Homeowner'
  },
  {
    name: 'Michael Chen',
    rating: 5,
    text: 'Professional, punctual, and skilled. The online booking system made scheduling super convenient.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    role: 'Business Owner'
  },
  {
    name: 'Emily Rodriguez',
    rating: 5,
    text: 'Outstanding attention to detail on our bathroom renovation. The team was courteous and professional throughout.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    role: 'Interior Designer'
  },
  {
    name: 'David Thompson',
    rating: 5,
    text: 'From start to finish, the experience was fantastic. They helped transform our outdated kitchen into a modern masterpiece.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    role: 'Real Estate Agent'
  }
];

const HowItWorksPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = testimonials.length - 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <div className="pt-28">
      {/* Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Our Process</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your home projects done in just a few simple steps. Professional service, guaranteed satisfaction.
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
                  className="bg-white rounded-lg p-6 shadow-lg relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="mb-4 text-primary">
                    <step.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>

                  {/* Add arrow after each step except the last one */}
                  {index < array.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-secondary" />
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">See How It Works</h2>
              <p className="text-xl text-white/90">
                Watch our quick video guide to learn more about our service process
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0"
                title="How It Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <button className="bg-white text-secondary font-bold text-lg px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">
                Book Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Explanation */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Service Area Information</h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "Do you charge extra for areas outside the main service region?",
                  answer: "A small travel fee may apply for locations outside our primary service area. The exact fee will be calculated and disclosed before scheduling your service."
                },
                {
                  question: "How can I request service if I'm not in a listed area?",
                  answer: "Please contact our customer service team directly. We evaluate out-of-area requests on a case-by-case basis and may be able to accommodate your needs."
                },
                {
                  question: "What is your service radius from your main location?",
                  answer: "We typically service within a 50-mile radius of our main office. However, we can often accommodate requests beyond this range for larger projects."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/20 transition-colors"
                    onClick={() => setCurrentIndex(currentIndex === index ? null : index)}
                  >
                    <span className="font-bold text-lg">{faq.question}</span>
                    {currentIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/80" />
                    )}
                  </button>
                  {currentIndex === index && (
                    <div className="px-6 py-4 bg-white/5">
                      <p className="text-white/90">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-white/90 mb-6">
                Not sure if we cover your area? Give us a call!
              </p>
              <a
                href="tel:8005551234"
                className="inline-flex items-center text-2xl font-bold text-white hover:text-white/90 transition-colors"
              >
                <Phone className="w-6 h-6 mr-2" />
                (800) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;