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

const HomePage: React.FC = () => {
  return (
    <>
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