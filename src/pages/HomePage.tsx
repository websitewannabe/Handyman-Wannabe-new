import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import ServiceAreas from '../components/ServiceAreas';
import ProcessSteps from '../components/ProcessSteps';
import BlogSection from '../components/BlogSection';
import PackagesSection from '../components/PackagesSection';
import InstagramFeed from '../components/InstagramFeed';
import SEO from '../components/SEO'; // Added import for SEO component

const HomePage: React.FC = () => {
  return (
    <>
      <SEO title="Handyman Services - Your Local Experts" description="Reliable and affordable handyman services for your home repair needs. Get a free quote today!" /> {/* Added SEO component */}
      <Hero />
      <ServiceAreas />
      <ProcessSteps />
      <Services />
      <Testimonials />
      <BlogSection />
      <PackagesSection />
      <InstagramFeed />
      <CallToAction />
    </>
  );
};

export default HomePage;