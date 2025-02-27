import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, GraduationCap, TrendingUp, ClipboardCheck, UserCheck, Calendar, HandshakeIcon, Star, Phone, Mail, Award, Heart, Clock } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const openPositions = [
  {
    title: "Master Plumber",
    location: "Greater Metropolitan Area",
    type: "Full-time",
    description: "Seeking an experienced plumber to join our growing team. Must have 5+ years of experience and required certifications."
  },
  {
    title: "Electrician",
    location: "Greater Metropolitan Area",
    type: "Full-time",
    description: "Licensed electrician needed for residential and light commercial work. Experience with modern smart home systems a plus."
  },
  {
    title: "General Handyman",
    location: "Greater Metropolitan Area",
    type: "Full-time / Part-time",
    description: "Multi-skilled handyman with experience in various home repair and maintenance tasks. Must have own tools and reliable transportation."
  },
  {
    title: "Carpenter",
    location: "Greater Metropolitan Area",
    type: "Full-time",
    description: "Skilled carpenter needed for custom woodworking, cabinet installation, and general carpentry work. Portfolio required."
  }
];

const employeeTestimonials = [
  {
    name: "David Martinez",
    role: "Senior Plumber",
    years: "4 years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "The support and growth opportunities at Handyman Wannabe have been incredible. I've advanced my career while doing what I love."
  },
  {
    name: "Rachel Thompson",
    role: "Lead Electrician",
    years: "3 years",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "The flexible scheduling and competitive pay make this the best company I've worked for. Plus, the team feels like family."
  },
  {
    name: "Michael Chang",
    role: "General Handyman",
    years: "2 years",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "I love the variety of work and the continuous learning opportunities. Every day brings new challenges and growth."
  }
];

const CareersPage = () => {
  return (
    <div className="pt-28">
      {/* Why Work With Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a company that values your skills, supports your growth, and rewards your dedication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Competitive Pay & Benefits",
                description: "Industry-leading compensation and comprehensive benefits package"
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                description: "Work-life balance with flexible hours and scheduling options"
              },
              {
                icon: GraduationCap,
                title: "Training & Development",
                description: "Continuous learning and skill development opportunities"
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                description: "Clear path for advancement and professional development"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md"
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
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">{position.title}</h3>
                    <p className="text-gray-600 mb-1">{position.location}</p>
                    <p className="text-gray-600">{position.type}</p>
                  </div>
                  <button className="btn-primary px-6 py-2">Apply Now</button>
                </div>
                <p className="text-gray-700">{position.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {employeeTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-primary">{testimonial.role}</p>
                      <p className="text-gray-600 text-sm">{testimonial.years} with us</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{testimonial.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: ClipboardCheck,
                title: "Submit Application",
                description: "Apply online in minutes with your resume and credentials"
              },
              {
                icon: UserCheck,
                title: "Initial Screening",
                description: "Our hiring team reviews your qualifications"
              },
              {
                icon: Calendar,
                title: "Interview Process",
                description: "Meet with our team to discuss the opportunity"
              },
              {
                icon: HandshakeIcon,
                title: "Onboarding",
                description: "Get the tools and training to succeed"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Career?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our team of skilled professionals and build a rewarding career.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="bg-white text-primary font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors">
                View Open Positions
              </button>
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">careers@handymanwannabe.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;