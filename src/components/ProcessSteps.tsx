
import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

// Define step type for better type safety
interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const ProcessSteps: React.FC = () => {
  // Use useMemo to prevent recreating the steps array on each render
  const steps = useMemo<Step[]>(() => [
    {
      id: 1,
      title: "Request a Quote",
      description: "Fill out our simple online form or give us a call to request a free, no-obligation quote for your project.",
      icon: "fas fa-clipboard-list"
    },
    {
      id: 2,
      title: "Schedule Service",
      description: "We'll work with your schedule to find a convenient time for our professional handyman to visit your home.",
      icon: "far fa-calendar-alt"
    },
    {
      id: 3,
      title: "Get the Job Done",
      description: "Our skilled technicians will arrive on time, complete the work efficiently, and clean up before leaving.",
      icon: "fas fa-tools"
    },
    {
      id: 4,
      title: "Satisfaction Guaranteed",
      description: "We follow up to ensure you're completely satisfied with our work and stand behind every project we complete.",
      icon: "fas fa-medal"
    }
  ], []);

  // Animation variants for containers and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Memoized step renderer to prevent unnecessary calculations
  const renderSteps = useMemo(() => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {steps.map((step) => (
        <StepCard key={step.id} step={step} variants={itemVariants} />
      ))}
    </motion.div>
  ), [steps]);

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Get your project done in just a few simple steps.
            Professional service, guaranteed satisfaction.
          </p>
        </motion.div>
        
        {renderSteps}
      </div>
    </section>
  );
};

// Memoized StepCard component to prevent unnecessary re-renders
const StepCard: React.FC<{ step: Step; variants: any }> = memo(({ step, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
    >
      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
        <i className={`${step.icon} text-white text-2xl`}></i>
      </div>
      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
      <p className="text-gray-600">{step.description}</p>
      <div className="mt-4 flex items-center justify-center">
        <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          {step.id}
        </span>
      </div>
    </motion.div>
  );
});

StepCard.displayName = 'StepCard';

export default memo(ProcessSteps);
