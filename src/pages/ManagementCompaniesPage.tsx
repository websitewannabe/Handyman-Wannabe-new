import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Home,
  Tool,
  ClipboardList,
  Users,
  Phone,
  Mail,
  Calendar,
  Lock,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const ManagementCompaniesPage = () => {
  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mt-8 md:mt-0 md:pr-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Property Management Services</h1>
              <p className="text-xl text-gray-600 mb-8">
                We help property management companies maintain their properties in top condition with reliable, efficient maintenance services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact" 
                  className="bg-primary text-white py-3 px-8 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <Calendar className="mr-2 h-5 w-5" /> Schedule Service
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-white text-primary border-2 border-primary py-3 px-8 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" /> Call For Quote
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Property Management Services" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Property Managers Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Tool,
                title: "Comprehensive Maintenance",
                description: "From routine repairs to emergency services, we handle all property maintenance needs.",
              },
              {
                icon: ClipboardList,
                title: "Simple Work Order System",
                description: "Easy-to-use work order management system for tracking and reporting on maintenance tasks.",
              },
              {
                icon: Users,
                title: "Dedicated Account Manager",
                description: "A single point of contact to ensure your property maintenance needs are met efficiently.",
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Property Managers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Property Manager, Urban Living Properties",
                text: "The Handyman Wannabe team has been instrumental in maintaining our properties. Their response time and quality of work is exceptional.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Operations Director, Parkview Management",
                text: "We've reduced our maintenance costs by 15% since partnering with Handyman Wannabe, while improving tenant satisfaction scores.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current h-5 w-5" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                question: "What property management services do you offer?",
                answer: "We offer comprehensive property maintenance services including routine repairs, preventative maintenance, emergency services, unit turnover, and specialized trade work for residential and commercial properties.",
              },
              {
                question: "How quickly do you respond to maintenance requests?",
                answer: "We pride ourselves on fast response times. For emergency issues, we respond within 1-2 hours. For routine maintenance, we typically schedule work within 24-48 hours of the request.",
              },
              {
                question: "Do you offer any reporting or documentation?",
                answer: "Yes, we provide detailed work order reports, maintenance histories, and cost tracking. Our digital documentation system helps property managers keep accurate records for all maintenance activities.",
              },
              {
                question: "Can you handle multiple properties or locations?",
                answer: "Absolutely. We service property management companies with single buildings or entire portfolios across multiple locations. Our team is structured to scale based on your needs.",
              },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="mb-8 border-b border-gray-200 pb-8 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to streamline your property maintenance?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Contact us today to learn how we can help your property management company save time and money while improving tenant satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-primary py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Mail className="mr-2 h-5 w-5" /> Contact Us
            </a>
            <a 
              href="tel:+1234567890" 
              className="bg-transparent border-2 border-white text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" /> (719) 315-6629
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementCompaniesPage;