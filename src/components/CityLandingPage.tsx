
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  city: string;
}

interface Service {
  name: string;
  description: string;
  icon: React.ComponentType;
}

interface CityLandingPageProps {
  cityName: string;
  services: Service[];
  testimonials: Testimonial[];
  heroImage?: string;
}

const CityLandingPage: React.FC<CityLandingPageProps> = ({
  cityName,
  services,
  testimonials,
  heroImage = "/images/Handyman-Hero.jpeg"
}) => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Handyman Wannabe - ${cityName}`,
    "description": `Professional handyman services in ${cityName}, PA. Expert home repairs, maintenance, and improvements by local technicians.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "url": `https://www.handymanwannabe.com/locations/${cityName.toLowerCase()}`,
    "telephone": "+12402667532",
    "areaServed": cityName,
    "priceRange": "$$"
  };

  return (
    <div className="relative">
      <Helmet>
        <title>{`Handyman Services in ${cityName}, PA | Handyman Wannabe`}</title>
        <meta
          name="description"
          content={`Professional handyman services in ${cityName}, PA. Expert repairs, maintenance, and home improvements by local technicians. Get an instant quote today!`}
        />
        <meta property="og:title" content={`Handyman Services in ${cityName}, PA | Handyman Wannabe`} />
        <meta property="og:description" content={`Professional handyman services in ${cityName}, PA. Expert repairs, maintenance, and home improvements by local technicians.`} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("${heroImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1B4332]/80"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Trusted Handyman Services in {cityName}, PA
          </motion.h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Your local experts for home repairs, maintenance, and improvements
          </p>
          <a
            href="https://carpet-quote-pro-ctierney1.replit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg inline-block"
          >
            Get an Instant Quote
          </a>
        </div>

        {/* Wave transition */}
        <div className="absolute -bottom-1 left-0 right-0 z-20">
          <svg
            className="w-full relative"
            style={{ height: "120px", color: "#ebd5c1" }}
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M 0,70 C 300,70 300,50 600,50 C 900,50 900,70 1200,70 L 1200,120 L 0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#ebd5c1]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B4332]">
            Our Services in {cityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-start">
                  <service.icon className="w-8 h-8 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Area Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1B4332]">
              About {cityName}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              As your neighbors in {cityName}, we understand the unique needs of local homeowners. 
              Our experienced technicians live and work in Bucks County, bringing their expertise 
              right to your doorstep. Trust us to maintain and improve your {cityName} home with 
              the attention to detail it deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              What {cityName} Residents Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-lg"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">{testimonial.text}</p>
                  <p className="font-bold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.city} Resident</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1B4332]">
            Ready to Start Your Project in {cityName}?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get professional handyman services from your local experts
          </p>
          <a
            href="https://carpet-quote-pro-ctierney1.replit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg inline-block"
          >
            Get Your Quote Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default CityLandingPage;
