import React from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    image: "/images/cleaner.avif",
    likes: 234,
    caption:
      "Another satisfied customer! Just finished this beautiful kitchen renovation. #HomeImprovement #HandymanLife",
  },
  {
    id: 2,
    image: "/images/kitchen2.avif",
    likes: 156,
    caption:
      "Transform your space with our expert painting services 🎨 #InteriorDesign #PaintingServices",
  },
  {
    id: 3,
    image: "/images/bathroom.avif",
    likes: 342,
    caption:
      "Emergency plumbing? We've got you covered 24/7! 🔧 #PlumbingServices #EmergencyRepair",
  },
  {
    id: 4,
    image: "/images/construction-Worker2.jpeg",
    likes: 189,
    caption:
      "Deck maintenance and repair - perfect for summer entertaining! ☀️ #OutdoorLiving #DeckRepair",
  },
  {
    id: 5,
    image: "/images/kitchen3.avif",
    likes: 276,
    caption:
      "Smart home installation complete! Bringing homes into the future. 🏠 #SmartHome #Technology",
  },
  {
    id: 6,
    image: "/images/living-Room.avif",
    likes: 198,
    caption:
      "Beautiful custom shelving installation for a happy client! 📚 #CustomWork #Carpentry",
  },
];

const InstagramFeed = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center space-x-2 mb-4"
          >
            <Instagram className="w-6 h-6 text-primary" />
            <span className="text-primary font-bold">@handymanwannabe</span>
          </motion.div>

          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Follow Us on Instagram
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get inspired by our latest projects and behind-the-scenes moments
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="relative group aspect-square overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <p className="text-sm mb-2">❤️ {post.likes}</p>
                  <p className="text-sm line-clamp-3">{post.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
