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
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, MapPin, DollarSign, X } from "lucide-react";

const jobListings = [
  {
    id: "handyman-technician",
    title: "Handyman Technician",
    location: "Colorado Springs, CO",
    type: "Full-time",
    salary: "$45,000 - $65,000 annually",
    description: "We're seeking skilled handyman technicians to join our growing team. The ideal candidate has experience in general home repair, carpentry, plumbing, electrical work, and excellent customer service skills.",
    responsibilities: [
      "Perform a wide range of home repairs and maintenance tasks",
      "Complete jobs efficiently while maintaining quality standards",
      "Communicate effectively with customers about their needs",
      "Provide accurate time and material estimates",
      "Maintain a clean work area and company vehicle"
    ],
    requirements: [
      "At least 2 years of experience in home repair or related field",
      "Valid driver's license with clean driving record",
      "Knowledge of basic electrical, plumbing, and carpentry work",
      "Ability to lift 50+ pounds and work in various conditions",
      "Excellent problem-solving and customer service skills"
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health, dental, and vision insurance",
      "401(k) retirement plan with company match",
      "Paid time off and holidays",
      "Company vehicle and tools provided",
      "Training and certification opportunities"
    ]
  },
  {
    id: "customer-service-representative",
    title: "Customer Service Representative",
    location: "Colorado Springs, CO",
    type: "Full-time",
    salary: "$35,000 - $45,000 annually",
    description: "Join our customer service team to help schedule appointments, answer customer inquiries, and ensure customer satisfaction with our handyman services.",
    responsibilities: [
      "Handle incoming calls and schedule service appointments",
      "Respond to customer inquiries via phone, email, and chat",
      "Coordinate with handyman technicians regarding scheduling",
      "Follow up with customers to ensure satisfaction",
      "Process payments and maintain customer records"
    ],
    requirements: [
      "1+ years of customer service experience",
      "Excellent communication and interpersonal skills",
      "Proficiency with CRM software and Microsoft Office",
      "Ability to multitask in a fast-paced environment",
      "Strong problem-solving abilities"
    ],
    benefits: [
      "Competitive salary with performance incentives",
      "Health, dental, and vision insurance",
      "401(k) retirement plan",
      "Paid time off and holidays",
      "Professional development opportunities",
      "Employee discount program"
    ]
  },
  {
    id: "marketing-coordinator",
    title: "Marketing Coordinator",
    location: "Colorado Springs, CO (Remote possible)",
    type: "Full-time",
    salary: "$40,000 - $55,000 annually",
    description: "We're looking for a creative and detail-oriented Marketing Coordinator to help grow our business through digital marketing, content creation, and community outreach.",
    responsibilities: [
      "Manage company social media accounts and digital presence",
      "Create engaging content for website, blog, and marketing materials",
      "Coordinate email marketing campaigns",
      "Track marketing metrics and prepare reports",
      "Assist with community events and promotional activities"
    ],
    requirements: [
      "Bachelor's degree in Marketing or related field preferred",
      "2+ years of marketing experience, preferably in service industry",
      "Proficiency with digital marketing tools and social media platforms",
      "Excellent writing and communication skills",
      "Experience with graphic design and content creation tools"
    ],
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "401(k) retirement plan",
      "Flexible working arrangements possible",
      "Paid time off and holidays",
      "Professional development budget"
    ]
  }
];

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<(typeof jobListings)[0] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: "",
    startDate: "",
    hearAbout: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleApplyNow = (job: (typeof jobListings)[0]) => {
    setSelectedJob(job);
    setShowForm(true);
    // Reset form when applying for a new job
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
      startDate: "",
      hearAbout: "",
    });
    setSubmitStatus("idle");
    
    // Scroll to form
    setTimeout(() => {
      const formElement = document.getElementById("application-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    // For now, we'll just simulate a successful submission
    setSubmitStatus("success");
    setTimeout(() => {
      setSubmitStatus("idle");
      setShowForm(false);
    }, 3000);
  };

  return (
    <div className="pt-28 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Our Team
          </motion.h1>
          <motion.p
            className="text-xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're looking for passionate professionals to help us deliver exceptional service to our customers. Explore our open positions below.
          </motion.p>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-primary">Career Growth</h3>
              <p className="text-gray-700">
                We invest in our team members with ongoing training, certification opportunities, and clear paths for advancement.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-primary">Competitive Benefits</h3>
              <p className="text-gray-700">
                Enjoy competitive pay, health benefits, retirement plans, and paid time off as part of our comprehensive benefits package.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-primary">Supportive Culture</h3>
              <p className="text-gray-700">
                Join a team that values collaboration, integrity, and work-life balance in a positive and inclusive workplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {jobListings.map((job) => (
              <motion.div
                key={job.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-1 text-primary" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-1 text-primary" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-5 h-5 mr-1 text-primary" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6">{job.description}</p>
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors font-bold"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      {showForm && selectedJob && (
        <section id="application-form" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold">
                  Apply for: {selectedJob.title}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Job Details */}
              <div className="mb-8 p-6 bg-white rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-primary">Position Details</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-1 text-primary" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-1 text-primary" />
                    <span>{selectedJob.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-5 h-5 mr-1 text-primary" />
                    <span>{selectedJob.salary}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{selectedJob.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">Responsibilities:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {selectedJob.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {selectedJob.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Benefits:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {selectedJob.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Your Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Available Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Resume (PDF) *
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter / Why You're a Good Fit
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-1">
                    How did you hear about us? *
                  </label>
                  <select
                    id="hearAbout"
                    name="hearAbout"
                    value={formData.hearAbout}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select an option</option>
                    <option value="Job Board">Job Board</option>
                    <option value="Company Website">Company Website</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-bold"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-bold"
                  >
                    Submit Application
                  </button>
                </div>
                
                {submitStatus === "success" && (
                  <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                    Your application has been submitted successfully! We'll be in touch soon.
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    There was an error submitting your application. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Join Our Team CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Don't See the Right Position?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file for future opportunities.
          </p>
          <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg">
            Send General Application
          </button>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
