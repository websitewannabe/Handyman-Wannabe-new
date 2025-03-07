import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
//import HowItWorks from '../components/HowItWorks';
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import ServiceAreas from "../components/ServiceAreas";
import ProcessSteps from "../components/ProcessSteps";
import BlogSection from "../components/BlogSection";
import PackagesSection from "../components/PackagesSection";
import InstagramFeed from "../components/InstagramFeed";
import { Helmet } from "react-helmet-async"; // Import Helmet

const SEO: React.FC<{
  title: string;
  description: string;
  keywords: string;
}> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Handyman Wannabe - Professional Home Services & Repairs"
        description="Handyman Wannabe offers professional home maintenance, repair, and improvement services. From carpentry to electrical work, we handle all your home service needs."
        keywords="handyman services, home repairs, home maintenance, professional handyman, home improvement"
        featuredImage="/images/Handyman-Hero.jpeg"
        ogImage="/images/Handyman-Hero.jpeg"
      />
      <Hero />
      <ServiceAreas />
      <ProcessSteps />
      <Services />
      <Testimonials />
      <BlogSection />
      <PackagesSection />
      <InstagramFeed />
      <CallToAction />
    </>
  );
};

export default HomePage;
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MessageSquare } from "lucide-react";
import Hero from "../components/Hero";

const HomePage: React.FC = () => {
  // Animation variants for consistent animations
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative">
      {/* Main Hero Section */}
      <Hero />

      {/* Services Section */}
      <ServicesSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
};

// Separated components for better organization and maintainability

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Home Security",
      description: "Secure your home with professional security systems installation",
      icon: "/images/services/security.svg",
      link: "/services/home-security"
    },
    {
      title: "Smart Home",
      description: "Transform your home with smart automation and connectivity",
      icon: "/images/services/smart-home.svg",
      link: "/services/smart-homes"
    },
    {
      title: "Plumbing",
      description: "Expert plumbing services for repairs, installations and maintenance",
      icon: "/images/services/plumbing.svg",
      link: "/services/plumbing"
    },
    {
      title: "Home Inspections",
      description: "Comprehensive home inspections to ensure everything is in order",
      icon: "/images/services/inspection.svg", 
      link: "/services/home-inspections"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From home security to smart automation, our skilled professionals provide comprehensive solutions for all your home needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <img src={service.icon} alt={service.title} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                to={service.link}
                className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      text: "The handymen were professional, efficient, and incredibly skilled. They fixed my broken cabinet and installed new lighting fixtures in just a few hours.",
      author: "Sarah Johnson",
      location: "Colorado Springs"
    },
    {
      text: "I've used their services for multiple home improvement projects, and they never disappoint. Their attention to detail and quality workmanship is outstanding.",
      author: "Michael Thompson",
      location: "Denver"
    },
    {
      text: "Very impressed with the smart home installation. Everything works perfectly, and the technician took the time to explain how to use all the new features.",
      author: "Jennifer Miller",
      location: "Aurora"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied customers about their experience with our services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{testimonial.text}</p>
              <div className="font-bold">{testimonial.author}</div>
              <div className="text-gray-500 text-sm">{testimonial.location}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Improve Your Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert service from our skilled professionals. Contact
            us today for a free quote!
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
        </motion.div>
      </div>
    </section>
  );
};

const FloatingChatButton: React.FC = () => {
  return (
    <button className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50" aria-label="Chat with us">
      <MessageSquare className="w-6 h-6" />
    </button>
  );
};

export default HomePage;
