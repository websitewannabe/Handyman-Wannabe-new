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

const teamMembers = [
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-80 object-cover ${member.name === "Dennis Tierney" ? "object-top" : "object-center"}`}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-primary">
                      {member.experience}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          {member.name}
                        </h3>
                        <p className="text-primary font-medium">
                          {member.role}
                        </p>
                      </div>
                      <div className="bg-primary/10 p-2 rounded-full">
                        <member.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="border-t pt-4">
                      <p className="text-gray-500 italic mb-4">
                        <span className="font-medium text-dark">Fun Fact:</span>{" "}
                        {member.funFact}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="ml-1 font-bold">
                            {member.rating}
                          </span>
                        </div>
                        <div className="text-gray-600">
                          {member.projects}+ Projects Completed
                        </div>
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