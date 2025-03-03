import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: "spring-maintenance",
    title: "10 Essential Home Maintenance Tips for Spring",
    excerpt:
      "Get your home ready for the warmer months with these crucial maintenance tasks that every homeowner should know.",
    image: "public/images/home-Keys.avif",
    author: "David Martinez",
    date: "March 15, 2025",
    category: "Maintenance",
  },
  {
    id: "kitchen-renovation",
    title: "Modern Kitchen Renovation Ideas on a Budget",
    excerpt:
      "Transform your kitchen without breaking the bank. Discover smart renovation tips and tricks from our experts.",
    image: "public/images/kitchen.jpeg",
    author: "Sarah Chen",
    date: "March 10, 2025",
    category: "Renovation",
  },
  {
    id: "smart-home-upgrades",
    title: "Smart Home Upgrades That Add Value",
    excerpt:
      "Learn which smart home improvements offer the best return on investment and enhance your daily life.",
    image: "public/images/smart-Lock.avif",
    author: "Mike Johnson",
    date: "March 5, 2025",
    category: "Smart Home",
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Latest from Our Blog
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Expert tips, guides, and inspiration for your home improvement
            projects
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Link to={`/blog?post=${post.id}`}>
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <span className="mr-1">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="inline-flex items-center text-primary font-bold hover:text-primary/80 transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
