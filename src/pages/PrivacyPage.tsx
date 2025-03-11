
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const PrivacyPage = () => {
  const policyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create and add the Termageddon script with proper attributes
    const script = document.createElement('script');
    script.src = "https://app.termageddon.com/js/termageddon.js";
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    
    // Add event listener to know when script is loaded
    script.onload = () => {
      console.log("Termageddon script loaded");
      
      // Force policy to initialize by dispatching a window resize event
      // This helps trigger Termageddon's initialization code if needed
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
    };
    
    // Add script to document
    document.body.appendChild(script);

    // Handle cleanup when component unmounts
    return () => {
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
            ref={policyContainerRef}
            id="policy"
            style={{width: "100%", minHeight: "800px", padding: "20px 0"}}
            data-policy-key="ZEhSRVQwdFVMMDVJUTBndmJGRTlQUT09"  

          {/* Direct iframe fallback if JavaScript loading fails */}
          <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">Direct Policy Access</h2>
            <p className="mb-4">If the policy doesn't load above, you can access it directly here:</p>
            <iframe 
              src="https://app.termageddon.com/api/policy/ZEhSRVQwdFVMMDVJUTBndmJGRTlQUT09?h-align=left&table-style=accordion"
              title="Privacy Policy"
              width="100%" 
              height="600px"
              style={{border: "1px solid #ddd", borderRadius: "4px"}}
            ></iframe>
          </div>

            data-extra="h-align=left&table-style=accordion"
            data-color="#000000"
          >
            Please wait while the policy is loaded. If it does not load, please{" "}
            <a 
              rel="nofollow" 
              href="https://app.termageddon.com/api/policy/ZEhSRVQwdFVMMDVJUTBndmJGRTlQUT09?h-align=left&table-style=accordion" 
              target="_blank" 
              aria-label="View Policy"
            >
              click here to view the policy</a>.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
