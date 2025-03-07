
// SEO helper functions for consistent metadata across pages

interface PageSEOData {
  title: string;
  description: string;
  keywords: string;
  featuredImage: string;
  path: string;
}

// Base domain for canonical URLs and absolute image paths
const domain = 'https://www.handymanwannabe.com'; 

// Collection of page-specific SEO data
export const pageSEOData: Record<string, PageSEOData> = {
  home: {
    title: 'Handyman Wannabe - Professional Home Services & Repairs',
    description: 'Handyman Wannabe offers professional home maintenance, repair, and improvement services. From carpentry to electrical work, we handle all your home service needs.',
    keywords: 'handyman services, home repairs, home maintenance, professional handyman, home improvement',
    featuredImage: '/images/Handyman-Hero.jpeg',
    path: '/'
  },
  aboutUs: {
    title: 'About Us - Handyman Wannabe',
    description: 'Learn more about our mission, values, and team at Handyman Wannabe. Discover our commitment to quality service and customer satisfaction.',
    keywords: 'about handyman wannabe, handyman team, professional handyman services, home repair experts',
    featuredImage: '/images/about-us-featured.jpg',
    path: '/about-us'
  },
  services: {
    title: 'Our Services - Handyman Wannabe',
    description: 'Explore our comprehensive handyman services including carpentry, electrical work, plumbing, furniture assembly, and more.',
    keywords: 'handyman services, carpentry, electrical work, plumbing, furniture assembly',
    featuredImage: '/images/services-featured.jpg',
    path: '/services'
  },
  careers: {
    title: 'Careers - Join Our Team at Handyman Wannabe',
    description: 'Find career opportunities with Handyman Wannabe. Join our team of professional handymen and grow your skills in a supportive environment.',
    keywords: 'handyman careers, handyman jobs, professional handyman, join handyman team',
    featuredImage: '/images/careers-featured.jpg',
    path: '/careers'
  }
};

// Helper function to get canonical URL
export const getCanonicalUrl = (path: string): string => {
  return `${domain}${path}`;
};

// Helper function to get absolute image URL
export const getAbsoluteImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${domain}${imagePath}`;
};
