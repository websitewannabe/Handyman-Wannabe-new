import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Calendar, HandshakeIcon, CreditCard, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: "Request a Quote",
    description: "Fill out our simple form with your service details for an instant quote.",
    delay: 0
  },
  {
    icon: Calendar,
    title: "Schedule Service",
    description: "Choose a time that works for you with our flexible scheduling system.",
    delay: 0.2
  },
  {
    icon: HandshakeIcon,
    title: "Job Completion",
    description: "Your handyman arrives on time and completes the work to your satisfaction.",
    delay: 0.4
  },
  {
    icon: CreditCard,
    title: "Payment & Review",
    description: "Pay securely online and share your experience with others.",
    delay: 0.6
  }
];

const ProcessSteps = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your home projects done in just a few simple steps. Professional service, guaranteed satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="bg-white rounded-lg p-6 shadow-lg relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step.delay }}
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="mb-4 text-primary">
                  <step.icon className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>

                {/* Add arrow after each step except the last one */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-secondary" />
                  </div>
                )}
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;