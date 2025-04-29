import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import ServiceAreas from "../components/ServiceAreas";
import BlogSection from "../components/BlogSection";
import PackagesSection from "../components/PackagesSection";
import TrustedLocalExpertise from '../components/TrustedLocalExpertise'; // Added import

const businessSchemaData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Handyman Wannabe",
  "description": "Professional handyman services in Colorado Springs and surrounding areas",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Colorado Springs",
    "addressRegion": "CO",
    "addressCountry": "US"
  },
  "url": "https://handymanwannabe.com",
  "telephone": "+1-719-123-4567"
};

// Memoized SEO component to prevent unnecessary re-renders
const SEO = memo(
  ({
    title,
    description,
    keywords,
    featuredImage,
    ogImage,
    canonicalUrl,
  }: {
    title: string;
    description: string;
    keywords: string;
    featuredImage?: string;
    ogImage?: string;
    canonicalUrl?: string;
  }) => (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Add Open Graph tags for better social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {featuredImage && <meta property="og:image" content={featuredImage} />}
      <meta property="og:type" content="website" />
      {/* Add Twitter Card data */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {/* Preload critical assets */}
      {featuredImage && <link rel="preload" href={featuredImage} as="image" />}
    </Helmet>
  ),
);

// Memoize sections that don't need frequent re-renders
const MemoizedServiceAreas = memo(ServiceAreas);
const MemoizedServices = memo(Services);
const MemoizedTestimonials = memo(Testimonials);
const MemoizedBlogSection = memo(BlogSection);
const MemoizedPackagesSection = memo(PackagesSection);
const MemoizedCallToAction = memo(CallToAction);

// Main HomePage component
const HomePage: React.FC = () => {
  // Placeholder data - Replace with actual data fetching mechanism
  const pageSEOData = {
    home: {
      title: "Handyman Wannabe - Professional Home Services & Repairs",
      description:
        "Handyman Wannabe offers professional home maintenance, repair, and improvement services. From carpentry to electrical work, we handle all your home service needs.",
      keywords:
        "handyman services, home repairs, home maintenance, professional handyman, home improvement",
      featuredImage: "/images/Handyman-Hero.jpeg",
      path: "/",
    },
  };

  const faqSchemaData = [
    {
      "@type": "Question",
      name: "What services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a wide range of handyman services, including carpentry, painting, plumbing, and electrical work.",
      },
    },
  ];

  const breadcrumbSchemaData = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.example.com",
      },
    ],
  };

  const getCanonicalUrl = (path: string) => `https://www.example.com${path}`;

  // Get SEO data for this page from our helper
  const seoData = pageSEOData.home || {
    title: "Handyman Wannabe - Professional Home Services & Repairs",
    description:
      "Handyman Wannabe offers professional home maintenance, repair, and improvement services. From carpentry to electrical work, we handle all your home service needs.",
    keywords:
      "handyman services, home repairs, home maintenance, professional handyman, home improvement",
    featuredImage: "/images/Handyman-Hero.jpeg",
    path: "/",
  };

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        featuredImage={seoData.featuredImage}
        ogImage={seoData.featuredImage}
        canonicalUrl={getCanonicalUrl(seoData.path)}
      />
      <Helmet>
        {/* Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify(businessSchemaData)}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchemaData)}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchemaData)}
        </script>
      </Helmet>

      {/* Core page content */}
      <Hero />
      <MemoizedPackagesSection />
      <TrustedLocalExpertise /> {/* Added TrustedLocalExpertise component */}
      <MemoizedServices />
      <MemoizedTestimonials />
      <MemoizedBlogSection />
      <MemoizedCallToAction />
    </>
  );
};

export default memo(HomePage);