import React from 'react';
import { ClipboardList, UserCheck, Calendar, Star } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Request a Quote',
    description: 'Describe your project and get a detailed estimate.'
  },
  {
    icon: UserCheck,
    title: 'Get Matched',
    description: 'Connect with a professional handyman for your needs.'
  },
  {
    icon: Calendar,
    title: 'Schedule & Complete',
    description: 'Pick a convenient time and get the job done right.'
  },
  {
    icon: Star,
    title: 'Review & Repeat',
    description: 'Share your experience and book again with ease.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-16">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/90">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;