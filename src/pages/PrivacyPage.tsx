
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const PrivacyPage = () => {
  useEffect(() => {
    // Load the Termageddon script after component mounts
    const script = document.createElement('script');
    script.src = 'https://app.termageddon.com/js/termageddon.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Privacy Policy - Handyman Wannabe"
        description="Our privacy policy outlines how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, personal information, handyman services"
      />

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

          <div id="policy" 
               className="w-full"
               data-policy-key="Ukd0RFJIazRObFptYWpSRFFsRTlQUT09" 
               data-extra="h-align=left&table-style=accordion"> 
            Please wait while the policy is loaded. If it does not load, please 
            <a rel="nofollow" 
               href="https://app.termageddon.com/api/policy/Ukd0RFJIazRObFptYWpSRFFsRTlQUT09?h-align=left&table-style=accordion" 
               target="_blank" 
               aria-label="View Policy">
               click here to view the policy
            </a>. 
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
