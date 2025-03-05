
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Handyman Wannabe - Professional Handyman Services',
  description = 'Handyman Wannabe provides professional and reliable handyman services for all your home maintenance and improvement needs.',
  keywords = 'handyman, home repair, home maintenance, professional handyman, home improvement',
  ogImage = '/images/handyman-wannabe-og.jpg',
  ogUrl,
  canonicalUrl,
}) => {
  const siteUrl = 'https://www.handymanwannabe.com'; // Replace with your actual domain
  const pageUrl = ogUrl || canonicalUrl || siteUrl;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
