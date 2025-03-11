
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const PrivacyPage = () => {
  useEffect(() => {
    // Add Termageddon script
    const script = document.createElement('script');
    script.src = "https://app.termageddon.com/js/termageddon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Privacy Policy - Handyman Wannabe"
        description="Our detailed privacy policy regarding the collection and use of personal information."
        keywords="privacy policy, data privacy, information security"
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <div 
            id="policy"
            style={{width: "100%", minHeight: "800px"}}
            data-policy-key="ZEhSRVQwdFVMMDVJUTBndmJGRTlQUT09"  
            data-extra="h-align=left&table-style=accordion"
          >
            Please wait while the policy is loaded. If it does not load, please 
            <a 
              rel="nofollow" 
              href="https://app.termageddon.com/api/policy/ZEhSRVQwdFVMMDVJUTBndmJGRTlQUT09?h-align=left&table-style=accordion" 
              target="_blank" 
              aria-label="View Policy"
            >
              click here to view the policy
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
