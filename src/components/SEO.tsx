
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Handyman Wannabe - Professional Home Services',
  description = 'Expert handyman services for all your home repair and improvement needs. Available 24/7 with skilled professionals.',
  canonicalUrl,
  ogImage = '/images/Handyman-Hero.jpeg',
  ogType = 'website',
  keywords = 'handyman, home repair, home improvement, professional handyman, local handyman',
}) => {
  const siteUrl = window.location.origin;
  const fullTitle = title.includes('Handyman Wannabe') ? title : `${title} | Handyman Wannabe`;
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={`${siteUrl}${ogImage}`} />}
      <meta property="og:url" content={canonicalUrl || window.location.href} />
      <meta property="og:site_name" content="Handyman Wannabe" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />}
    </Helmet>
  );
};

export default SEO;
