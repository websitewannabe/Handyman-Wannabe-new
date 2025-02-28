import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Check, Star, Users, ChevronRight } from "lucide-react";
import JobApplicationModal from "../components/JobApplicationModal";

// Sample job data - replace with your actual data
const jobs = [
  {
    id: "handyman1",
    title: "Senior Handyman",
    description: "We are looking for an experienced Senior Handyman to join our growing team. In this role, you will lead projects, mentor junior handymen, and ensure high-quality service delivery to our customers.",
    qualifications: [
      "5+ years of professional handyman experience",
      "Strong expertise in carpentry, plumbing, and electrical work",
      "Problem-solving skills and ability to work independently",
      "Excellent customer service and communication skills",
      "Valid driver's license and reliable transportation"
    ],
    location: "Colorado Springs, CO",
    workType: "Full-time",
    department: "Field Services"
  },
  {
    id: "handyman2",
    title: "Junior Handyman",
    description: "We're seeking entry-level handymen to join our team. This position is perfect for individuals who are passionate about home improvement and want to develop their skills under the guidance of experienced professionals.",
    qualifications: [
      "1+ year experience in home repair or related field",
      "Basic knowledge of common household repairs",
      "Willingness to learn and take direction",
      "Customer-focused attitude",
      "Valid driver's license required"
    ],
    location: "Colorado Springs, CO",
    workType: "Full-time",
    department: "Field Services"
  },
  {
    id: "customer-service",
    title: "Customer Service Representative",
    description: "Join our customer service team to help schedule appointments, answer customer inquiries, and ensure a smooth experience for our clients. You'll be the first point of contact for our customers and play a crucial role in our service delivery.",
    qualifications: [
      "Previous customer service experience preferred",
      "Excellent communication and interpersonal skills",
      "Ability to multitask in a fast-paced environment",
      "Proficiency with scheduling software and CRM systems",
      "Problem-solving attitude"
    ],
    location: "Colorado Springs, CO",
    workType: "Full-time / Part-time",
    department: "Customer Support"
  },
  {
    id: "office-manager",
    title: "Office Manager",
    description: "We're looking for an organized and efficient Office Manager to oversee our administrative operations. You'll ensure the smooth running of our office, manage supplies, coordinate with service teams, and handle general administrative tasks.",
    qualifications: [
      "3+ years of office management experience",
      "Strong organizational and time management skills",
      "Proficiency in Microsoft Office and project management tools",
      "Experience in bookkeeping and financial reporting",
      "Excellent communication and leadership abilities"
    ],
    location: "Colorado Springs, CO",
    workType: "Full-time",
    department: "Administration"
  }
];

const benefits = [
  "Competitive pay with bonuses",
  "Medical, dental, and vision insurance",
  "401(k) retirement plan with company match",
  "Paid time off and holidays",
  "Professional development opportunities",
  "Employee discounts",
  "Flexible scheduling options",
  "Career advancement pathways"
];

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openApplicationModal = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setIsModalOpen(true);

    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeApplicationModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);

    // Re-enable scrolling when modal is closed
    document.body.style.overflow = "auto";
  };

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Join Our Team of Home Service Professionals
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Build your career with a growing company that values skill, integrity, and customer service.
            </motion.p>
            <motion.a 
              href="#open-positions"
              className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              View Open Positions
            </motion.a>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Join Our Team?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe in creating a supportive work environment where you can grow your skills, advance your career, and make a difference in our customers' homes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="bg-primary/10 p-4 rounded-full inline-block mb-6">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Skill Development</h3>
                <p className="text-gray-600">
                  Continuous training and learning opportunities to expand your technical skills and professional knowledge.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="bg-primary/10 p-4 rounded-full inline-block mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Supportive Culture</h3>
                <p className="text-gray-600">
                  Work with a team that values collaboration, respect, and work-life balance while delivering exceptional service.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="bg-primary/10 p-4 rounded-full inline-block mb-6">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Career Growth</h3>
                <p className="text-gray-600">
                  Clear pathways for advancement with opportunities to move into senior roles, specializations, or management positions.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our team of professionals and build your career with us. We're looking for dedicated individuals who share our values and passion for excellent service.
              </p>
            </div>

            <div className="space-y-6">
              {jobs.map((job) => (
                <motion.div 
                  key={job.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
                          <div className="flex items-center">
                            <Briefcase className="w-5 h-5 mr-2 text-primary" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-primary" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => openApplicationModal(job)}
                        className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                      >
                        Apply Now
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {job.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Key Qualifications:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {job.qualifications.slice(0, 4).map((qualification, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{qualification}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're looking for talented individuals to help us deliver exceptional service to our customers. Apply today and become part of our growing team!
          </p>
          <a 
            href="#open-positions"
            className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </section>

      {/* Application Modal */}
      {isModalOpen && selectedJob && (
        <JobApplicationModal 
          job={selectedJob} 
          onClose={closeApplicationModal} 
        />
      )}
    </div>
  );
};

export default CareersPage;