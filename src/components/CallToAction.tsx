import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-white mb-6">Ready to Start Your Project?</h2>
        <p className="text-white/90 mb-8 text-lg">
          No obligation, just expert help when you need it!
        </p>
        <button className="bg-white text-primary font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors">
          Get an Instant Quote Now!
        </button>
      </div>
    </section>
  );
};

export default CallToAction;