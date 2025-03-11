import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Star,
  PenTool as Tool,
  Wrench,
  Zap,
  Droplet,
  Hammer,
  Paintbrush,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const fieldMembers = [
  {
    name: "Dennis Tierney",
    role: "Field Manager",
    specialty: "general",
    experience: "15+ years",
    image: "/images/Dennis-Tierney.png",
    bio: "Experienced field manager overseeing all on-site operations and ensuring quality workmanship on every project.",
    funFact: "Can troubleshoot any home issue within minutes of inspection",
    icon: Wrench,
    projects: 750,
    rating: 4.9,
  },
  {
    name: "Chris Tierney",
    role: "Director of Operations",
    specialty: "management",
    experience: "30+ years",
    image: "/images/Chris-Tierney.jpg",
    bio: "Strategic operations director with a focus on efficiency, customer satisfaction, and business growth.",
    funFact:
      "Transformed our scheduling system to reduce response times by 45%",
    icon: Tool,
    projects: 950,
    rating: 4.9,
  },
];

const officeMembers = [
  {
    name: "Jane Doe",
    role: "Office Manager",
    experience: "10+ years",
    image: "/images/placeholder.jpg", // Replace with actual image
    bio: "Manages day-to-day office operations.",
    funFact: "Expert in office organization.",
    icon: Paintbrush, // Replace with appropriate icon
    rating: 4.5,
  },
  {
    name: "John Smith",
    role: "Accountant",
    experience: "5+ years",
    image: "/images/placeholder.jpg", // Replace with actual image
    bio: "Handles all financial matters.",
    funFact: "Adept at tax preparation.",
    icon: Hammer, // Replace with appropriate icon
    rating: 4.8,
  },
  {
    name: "Sarah Jones",
    role: "Receptionist",
    experience: "2+ years",
    image: "/images/placeholder.jpg", // Replace with actual image
    bio: "Greets clients and handles phone calls.",
    funFact: "Excellent communication skills.",
    icon: Phone, // Replace with appropriate icon
    rating: 4.7,
  },
];


const MeetTeamPage = () => {
  return (
    <div className="pt-28">
      {/* Team Members Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              className="text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Meet Our Team
            </motion.h1>

            {/* Field Team Members */}
            <motion.h2 
              className="text-3xl font-bold mb-8 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Field Team
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {fieldMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  {...fadeIn}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                        style={{ aspectRatio: "1/1" }}
                        onError={(e) => {
                          e.currentTarget.src = "/images/home-Keys.avif"; // Fallback image
                        }}
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-2">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <member.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">{member.name}</h2>
                      </div>
                      <h3 className="text-lg text-primary font-semibold mb-3">
                        {member.role}
                      </h3>
                      <p className="text-gray-600 mb-4">{member.bio}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <div className="bg-gray-100 rounded-full px-3 py-1 mr-3">
                          <span className="font-medium">
                            {member.experience} Experience
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                          <span>{member.rating}/5</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-4 mt-4">
                        <div className="flex items-center text-gray-600">
                          <p className="text-sm">
                            <span className="font-bold">Fun Fact: </span>
                            {member.funFact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Office Staff Section */}
            <motion.h2 
              className="text-3xl font-bold mb-8 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Office Staff
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {officeMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  {...fadeIn}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <member.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold">{member.name}</h2>
                    </div>
                    <h3 className="text-lg text-primary font-semibold mb-3">
                      {member.role}
                    </h3>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="bg-gray-100 rounded-full px-3 py-1 mr-3">
                        <span className="font-medium">
                          {member.experience} Experience
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <div className="flex items-center text-gray-600">
                        <p className="text-sm">
                          <span className="font-bold">Fun Fact: </span>
                          {member.funFact}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Want to Join Our Team?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We're always looking for skilled professionals to join our growing
              family.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="bg-white text-primary font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors">
                View Open Positions
              </button>
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">
                  careers@handymanwannabe.com
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MeetTeamPage;