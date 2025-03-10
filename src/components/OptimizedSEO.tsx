
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface OptimizedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  featuredImage?: string;
  path?: string;
  overrideCanonical?: string;
}

const OptimizedSEO: React.FC<OptimizedSEOProps> = ({
  title = 'Handyman Wannabe - Professional Handyman Services',
  description = 'Handyman Wannabe provides professional and reliable handyman services for all your home maintenance and improvement needs.',
  keywords = 'handyman, home repair, home maintenance, professional handyman, home improvement',
  ogImage = '/images/Handyman-Hero.jpeg',
  featuredImage = '/images/Handyman-Hero.jpeg',
  path,
  overrideCanonical,
}) => {
  const location = useLocation();
  const domain = "https://www.handymanwannabe.com";
  
  // Generate canonical URL (without query parameters)
  const getCanonicalUrl = () => {
    if (overrideCanonical) return overrideCanonical;
    
    // If path is provided, use it, otherwise use current path
    const urlPath = path || location.pathname;
    return `${domain}${urlPath}`;
  };
  
  const canonicalUrl = getCanonicalUrl();
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${domain}${ogImage}`;
  const featuredImageUrl = featuredImage.startsWith('http') ? featuredImage : `${domain}${featuredImage}`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL - always present and always clean */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card data */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Featured Image */}
      <link rel="image_src" href={featuredImageUrl} />
    </Helmet>
  );
};

export default OptimizedSEO;
