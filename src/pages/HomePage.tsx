
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import ServiceAreas from "../components/ServiceAreas";
import ProcessSteps from "../components/ProcessSteps";
import BlogSection from "../components/BlogSection";
import PackagesSection from "../components/PackagesSection";
import InstagramFeed from "../components/InstagramFeed";

// Memoized SEO component to prevent unnecessary re-renders
const SEO = memo(({ 
  title, 
  description, 
  keywords 
}: {
  title: string;
  description: string;
  keywords: string;
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    {/* Add Open Graph tags for better social sharing */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/images/Handyman-Hero.jpeg" />
    <meta property="og:type" content="website" />
    {/* Add Twitter Card data */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="/images/Handyman-Hero.jpeg" />
    {/* Preload critical assets */}
    <link rel="preload" href="/images/Handyman-Hero.jpeg" as="image" />
  </Helmet>
));

// Memoize sections that don't need frequent re-renders
const MemoizedServiceAreas = memo(ServiceAreas);
const MemoizedProcessSteps = memo(ProcessSteps);
const MemoizedServices = memo(Services);
const MemoizedTestimonials = memo(Testimonials);
const MemoizedBlogSection = memo(BlogSection);
const MemoizedPackagesSection = memo(PackagesSection);
const MemoizedInstagramFeed = memo(InstagramFeed);
const MemoizedCallToAction = memo(CallToAction);

// Main HomePage component
const HomePage: React.FC = () => {
  // SEO content constants to avoid re-creating on each render
  const seoProps = {
    title: "Handyman Wannabe - Professional Home Services & Repairs",
    description: "Handyman Wannabe offers professional home maintenance, repair, and improvement services. From carpentry to electrical work, we handle all your home service needs.",
    keywords: "handyman services, home repairs, home maintenance, professional handyman, home improvement"
  };

  return (
    <>
      <SEO {...seoProps} />
      
      {/* Core page content */}
      <Hero />
      <MemoizedServiceAreas />
      <MemoizedProcessSteps />
      <MemoizedServices />
      <MemoizedTestimonials />
      <MemoizedBlogSection />
      <MemoizedPackagesSection />
      <MemoizedInstagramFeed />
      <MemoizedCallToAction />
    </>
  );
};

export default memo(HomePage);
