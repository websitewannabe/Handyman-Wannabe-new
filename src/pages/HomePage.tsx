import React, { memo, lazy, Suspense, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Services from "../components/Services";
import CallToAction from "../components/CallToAction";

// Import only critical components directly
// Lazy load non-critical components
const Testimonials = lazy(() => import("../components/Testimonials"));
const ServiceAreas = lazy(() => import("../components/ServiceAreas"));
const BlogSection = lazy(() => import("../components/BlogSection"));
const PackagesSection = lazy(() => import("../components/PackagesSection"));
const InstagramFeed = lazy(() => import("../components/InstagramFeed"));

// Simple loading component
const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="animate-pulse h-32 w-full max-w-4xl rounded bg-gray-200"></div>
  </div>
);

// Improved SEO component to prevent unnecessary re-renders
const SEO = memo(
  ({
    title,
    description,
    keywords,
    featuredImage,
    ogImage,
    canonicalUrl
  }: {
    title: string;
    description: string;
    keywords: string;
    featuredImage?: string;
    ogImage?: string;
    canonicalUrl?: string;
  }) => (
    <Helmet prioritizeSeoTags>
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
      {/* Preload only critical assets */}
      {featuredImage && <link rel="preload" href={featuredImage} as="image" />}
    </Helmet>
  ),
);

// Memoize the critical sections
const MemoizedServices = memo(Services);
const MemoizedCallToAction = memo(CallToAction);

// Main HomePage component with lazy loading sections
const HomePage: React.FC = () => {
  // State to track which sections should be visible
  const [visibleSections, setVisibleSections] = useState({
    serviceAreas: false,
    testimonials: false,
    blogSection: false,
    packagesSection: false,
    instagramFeed: false
  });

  // Refs for intersection observer
  const serviceAreasRef = React.useRef<HTMLDivElement>(null);
  const testimonialsRef = React.useRef<HTMLDivElement>(null);
  const blogSectionRef = React.useRef<HTMLDivElement>(null);
  const packagesSectionRef = React.useRef<HTMLDivElement>(null);
  const instagramFeedRef = React.useRef<HTMLDivElement>(null);

  // Set up intersection observer to load components as they come into view
  useEffect(() => {
    const observerOptions = {
      rootMargin: '200px', // Load when within 200px of viewport
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setVisibleSections(prev => ({ ...prev, [id]: true }));
          observer.unobserve(entry.target); // Stop observing once loaded
        }
      });
    }, observerOptions);

    // Observe all section placeholders
    if (serviceAreasRef.current) observer.observe(serviceAreasRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (blogSectionRef.current) observer.observe(blogSectionRef.current);
    if (packagesSectionRef.current) observer.observe(packagesSectionRef.current);
    if (instagramFeedRef.current) observer.observe(instagramFeedRef.current);

    return () => observer.disconnect();
  }, []);

  // Schema data - this doesn't change so we can memoize it
  const schemaData = React.useMemo(() => {
    const businessSchemaData = {
      "@context": "https://schema.org/",
      "@type": "LocalBusiness",
      "name": "Handyman Wannabe",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main St",
        "addressLocality": "Anytown",
        "addressRegion": "CA",
        "postalCode": "90210",
        "addressCountry": "US"
      },
      "telephone": "+15551234567",
      "priceRange": "$$$",
      "openingHours": "Mo-Fr 09:00-17:00",
      "url": "https://www.example.com"
    };

    const faqSchemaData = [
      {
        "@type": "Question",
        "name": "What services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a wide range of handyman services, including carpentry, painting, plumbing, and electrical work."
        }
      }
    ];

    const breadcrumbSchemaData = {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.example.com"
        }
      ]
    };

    return { businessSchemaData, faqSchemaData, breadcrumbSchemaData };
  }, []);

  // SEO data
  const seoData = {
    title: 'Handyman Wannabe - Professional Home Services & Repairs',
    description: 'Handyman Wannabe offers professional home maintenance, repair, and improvement services. From carpentry to electrical work, we handle all your home service needs.',
    keywords: 'handyman services, home repairs, home maintenance, professional handyman, home improvement',
    featuredImage: '/images/Handyman-Hero.jpeg',
    path: '/'
  };

  const getCanonicalUrl = (path: string) => `https://www.example.com${path}`;

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
        {/* Combined Schema Data to reduce script tags */}
        <script type="application/ld+json">
          {JSON.stringify([
            schemaData.businessSchemaData,
            schemaData.faqSchemaData,
            schemaData.breadcrumbSchemaData
          ])}
        </script>
      </Helmet>

      {/* Critical components loaded immediately */}
      <Hero />
      <MemoizedServices />
      
      {/* Lazy-loaded components */}
      <div id="serviceAreas" ref={serviceAreasRef}>
        {visibleSections.serviceAreas ? (
          <Suspense fallback={<SectionLoader />}>
            <ServiceAreas />
          </Suspense>
        ) : <SectionLoader />}
      </div>
      
      <div id="testimonials" ref={testimonialsRef}>
        {visibleSections.testimonials ? (
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
        ) : <SectionLoader />}
      </div>
      
      <div id="blogSection" ref={blogSectionRef}>
        {visibleSections.blogSection ? (
          <Suspense fallback={<SectionLoader />}>
            <BlogSection />
          </Suspense>
        ) : <SectionLoader />}
      </div>
      
      <div id="packagesSection" ref={packagesSectionRef}>
        {visibleSections.packagesSection ? (
          <Suspense fallback={<SectionLoader />}>
            <PackagesSection />
          </Suspense>
        ) : <SectionLoader />}
      </div>
      
      <div id="instagramFeed" ref={instagramFeedRef}>
        {visibleSections.instagramFeed ? (
          <Suspense fallback={<SectionLoader />}>
            <InstagramFeed />
          </Suspense>
        ) : <SectionLoader />}
      </div>
      
      {/* Call to action is critical, so load it directly */}
      <MemoizedCallToAction />
    </>
  );
};

export default memo(HomePage);