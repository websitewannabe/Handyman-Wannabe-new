
import React from 'react';
import CityLandingPage from '../../components/CityLandingPage';
import { Hammer, Wrench, Paintbrush, Zap, Shield } from 'lucide-react';

const DoylestownPage = () => {
  const services = [
    {
      name: "Carpentry & Repairs",
      description: "Expert woodworking and repair services for your Doylestown home",
      icon: Hammer
    },
    {
      name: "General Maintenance",
      description: "Comprehensive home maintenance services",
      icon: Wrench
    },
    {
      name: "Painting & Drywall",
      description: "Professional interior and exterior painting",
      icon: Paintbrush
    },
    {
      name: "Electrical Services",
      description: "Licensed electrical repairs and installations",
      icon: Zap
    },
    {
      name: "Home Security",
      description: "Modern security solutions for your peace of mind",
      icon: Shield
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The team at Handyman Wannabe did an amazing job with our home repairs. Professional, punctual, and perfect work!",
      rating: 5,
      city: "Doylestown"
    },
    {
      name: "Michael Brown",
      text: "I've used them for multiple projects around my house. Always reliable and great attention to detail.",
      rating: 5,
      city: "Doylestown"
    }
  ];

  return (
    <CityLandingPage
      cityName="Doylestown"
      services={services}
      testimonials={testimonials}
      heroImage="/images/Handyman-Hero.jpeg"
    />
  );
};

export default DoylestownPage;
