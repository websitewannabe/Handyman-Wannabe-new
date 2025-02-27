import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Search, ChevronDown } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "spring-maintenance",
    title: "10 Essential Home Maintenance Tips for Spring",
    excerpt: "Get your home ready for the warmer months with these crucial maintenance tasks that every homeowner should know.",
    content: "Spring is the perfect time to assess winter damage and prepare your home for the warmer months ahead. Start by inspecting your roof for any damage from winter storms, clean your gutters of debris, and check your foundation for cracks. Don't forget to service your HVAC system and replace filters for optimal performance during the summer months.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "David Martinez",
    date: "March 15, 2025",
    category: "Maintenance",
    readTime: "5 min read"
  },
  {
    id: "kitchen-renovation",
    title: "Modern Kitchen Renovation Ideas on a Budget",
    excerpt: "Transform your kitchen without breaking the bank. Discover smart renovation tips and tricks from our experts.",
    content: "Renovating your kitchen doesn't have to cost a fortune. Simple updates like painting cabinets, replacing hardware, and updating lighting can make a significant impact. Consider installing a new backsplash or refinishing countertops instead of complete replacement. Smart planning and DIY approaches can help you achieve a modern look without excessive spending.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Sarah Chen",
    date: "March 10, 2025",
    category: "Renovation",
    readTime: "7 min read"
  },
  {
    id: "smart-home-upgrades",
    title: "Smart Home Upgrades That Add Value",
    excerpt: "Learn which smart home improvements offer the best return on investment and enhance your daily life.",
    content: "Smart home technology continues to evolve, offering both convenience and value to homeowners. Start with essential upgrades like smart thermostats and security systems, which offer immediate energy savings and enhanced security. Consider smart lighting systems and automated window treatments for added convenience and energy efficiency.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Mike Johnson",
    date: "March 5, 2025",
    category: "Smart Home",
    readTime: "6 min read"
  }
];

const categories = [
  "All",
  "Maintenance",
  "Renovation",
  "Smart Home",
  "DIY",
  "Interior Design",
  "Outdoor Living"
];

const BlogPage = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('post');
  const selectedPost = postId ? blogPosts.find(post => post.id === postId) : null;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    return (
      <div className="pt-28">
        <div className="container mx-auto px-4 py-12">
          <Link 
            to="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <article>
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <span className="bg-primary px-3 py-1 rounded-full">
                    {selectedPost.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {selectedPost.author}
                  </span>
                </div>
                <h1 className="text-4xl font-bold">{selectedPost.title}</h1>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                {selectedPost.excerpt}
              </p>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700">
                  {selectedPost.content}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Our Blog
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Expert tips, guides, and inspiration for your home improvement projects
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-4 items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative flex-grow max-w-xl">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary text-lg border border-gray-300"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white px-6 py-4 rounded-lg text-dark border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-lg pr-12"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog?post=${post.id}`}>
                  <div className="relative aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center mr-4">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-medium">Read More</span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;