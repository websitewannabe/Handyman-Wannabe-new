// SEO.js
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonicalUrl, ogImage }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;


// HomePage.js
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
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Handyman Wannabe - Your trusted partner for all home repair and improvement services. Professional handyman services at affordable prices." 
        canonicalUrl="https://yourdomain.com/"
        ogImage="images/Handyman-Hero.jpeg"
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