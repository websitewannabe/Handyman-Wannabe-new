
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  featuredImage?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schemaData?: Record<string, any>;
}

// Optimized SEO component that reduces render-blocking
const OptimizedSEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  featuredImage,
  ogImage,
  canonicalUrl,
  schemaData
}) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {featuredImage && <meta property="og:image" content={featuredImage} />}
      <meta property="og:type" content="website" />
      
      {/* Twitter Card data */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Schema.org data as JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default React.memo(OptimizedSEO);
