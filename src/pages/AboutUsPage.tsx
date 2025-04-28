import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Shield,
  Clock,
  ThumbsUp,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO"; // Added import for SEO component
import { Helmet } from "react-helmet-async";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const teamMembers = [
  {
    name: "Dennis Tierney",
    role: "Field Manager",
    image: "/images/Dennis-Tierney.png",
    bio: "Experienced Field Manager",
  },
  {
    name: "Chris Tierney",
    role: "Director of Operations",
    image: "/images/Chris-Tierney.jpg",
    bio: "Director of Operations",
  },
];

const AboutUsPage = () => {
  return (
    <div className="pt-28">
      <Helmet>
        <title>About Us | Handyman Wannabe</title>
        <meta
          name="description"
          content="Learn about the mission, values, and expert team behind Handyman Wannabe. We deliver reliable home repairs with transparent pricing and guaranteed satisfaction."
        />
        <meta
          name="keywords"
          content="about handyman wannabe, handyman services, home repair experts, local handyman team, handyman mission, professional repairs, trusted home services"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "About Us - Handyman Wannabe",
            url: "https://handymanwannabe.com/about",
            description:
              "Get to know Handyman Wannabe — our story, our skilled team, and our commitment to quality workmanship, fair pricing, and fast scheduling.",
            publisher: {
              "@type": "Organization",
              name: "Handyman Wannabe",
              url: "https://handymanwannabe.com",
              logo: {
                "@type": "ImageObject",
                url: "https://handymanwannabe.com/images/logo.png",
              },
            },
          })}
        </script>
      </Helmet>

      <SEO
        title="About Us - Handyman Wannabe"
        description="Learn more about our mission, values, and team at Handyman Wannabe. Discover our commitment to quality service and customer satisfaction."
        keywords="about handyman wannabe, handyman team, professional handyman services, home repair experts"
        featuredImage="/images/about-us-featured.jpg"
        ogImage="/images/about-us-featured.jpg"
      />
      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To make home repairs and improvements stress-free by connecting
              customers with trusted, skilled handymen who deliver exceptional
              results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Wrench,
                title: "High-Quality Workmanship",
                description: "Every job completed to the highest standards",
              },
              {
                icon: Shield,
                title: "Transparent Pricing",
                description: "No hidden fees or surprise charges",
              },
              {
                icon: Clock,
                title: "Fast & Easy Scheduling",
                description: "Book your service in under 2 minutes",
              },
              {
                icon: ThumbsUp,
                title: "Satisfaction Guaranteed",
                description: "100% satisfaction or your money back",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Meet Our Field Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-gray-200">{member.bio}</p>
                  </div>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Service Area */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <MapPin className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Service Area</h3>
                <p className="text-gray-600">Bucks County Area</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Phone className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-600">(267) 635-7958</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Mail className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-600">info@handymanwannabe.com</p>
              </motion.div>
            </div>
            <Link
              to="/contact"
              className="inline-block bg-secondary text-white text-xl px-12 py-4 rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Need Reliable Home Repairs?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's get started on making your home improvement dreams a
              reality.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="bg-white text-primary font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors">
                Get an Instant Quote Now!
              </button>
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">(800) 555-1234</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
