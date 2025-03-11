
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const DisclaimerPage = () => {
  const policyContainerRef = useRef<HTMLDivElement>(null);

  // Track if the Termageddon script failed to load
  const [scriptFailed, setScriptFailed] = useState(false);
  
  useEffect(() => {
    // Create and load the Termageddon script
    const script = document.createElement('script');
    script.src = "https://app.termageddon.com/js/termageddon.js";
    script.async = true;
    
    // Set up error handling for script
    script.onerror = () => {
      console.error("Termageddon script failed to load");
      setScriptFailed(true);
    };
    
    // Set a timeout to check if policy loaded
    const timeoutId = setTimeout(() => {
      // Check if policy container still has the fallback text
      if (policyContainerRef.current) {
        const policyDiv = policyContainerRef.current.querySelector("#policy");
        if (policyDiv && policyDiv.innerHTML.includes("Please wait while the policy is loaded")) {
          console.warn("Termageddon policy did not load within timeout period");
          setScriptFailed(true);
        }
      }
    }, 5000);
    
    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Disclaimer - Handyman Wannabe"
        description="Please read our disclaimer for important information about our handyman services and your use of our website."
        keywords="disclaimer, legal disclaimer, liability disclaimer, service disclaimer"
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Disclaimer</h1>
          
          <div ref={policyContainerRef} className="bg-white p-6 rounded-lg shadow-md">
            {!scriptFailed ? (
              /* Termageddon policy container */
              <div 
                id="policy" 
                style={{ width: "100%", minHeight: "480px" }}
                data-policy-key="YWtReGRETjNkV1F6U1ZsS2QyYzlQUT09"
                data-extra="h-align=left&table-style=accordion"
              >
                Please wait while the policy is loaded. If it does not load, please 
                <a 
                  rel="nofollow" 
                  href="https://app.termageddon.com/api/policy/YWtReGRETjNkV1F6U1ZsS2QyYzlQUT09?h-align=left&table-style=accordion" 
                  target="_blank" 
                  aria-label="View Policy"
                  className="text-primary hover:underline ml-1"
                >
                  click here to view the policy
                </a>.
              </div>
            ) : (
              /* Fallback iframe solution */
              <div className="w-full">
                <p className="mb-4 text-gray-600">Loading Disclaimer:</p>
                <iframe 
                  src="https://app.termageddon.com/api/policy/YWtReGRETjNkV1F6U1ZsS2QyYzlQUT09?h-align=left&table-style=accordion"
                  title="Disclaimer"
                  width="100%"
                  height="600px"
                  className="border-0"
                  style={{ minHeight: "600px" }}
                ></iframe>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
