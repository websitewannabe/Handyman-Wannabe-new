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
import { Helmet } from 'react-helmet-async'; // Import Helmet


const SEO: React.FC<{
  title: string;
  description: string;
  keywords: string;
}> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};


const HomePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Handyman Wannabe - Professional Home Services & Repairs"
        description="Handyman Wannabe offers professional home maintenance, repair, and improvement services. From carpentry to electrical work, we handle all your home service needs."
        keywords="handyman services, home repairs, home maintenance, professional handyman, home improvement"
      />
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