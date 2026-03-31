
import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const AccessibilityPage = () => {
  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Accessibility Statement - Handyman Wannabe"
        description="Our commitment to digital accessibility for people with disabilities."
        keywords="accessibility, web accessibility, disability access, WCAG"
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Accessibility Statement</h1>

          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p>
            Handyman Wannabe is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to guarantee we provide equal access to all users.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Our website strives to conform to WCAG 2.1 Level AA. We conduct regular reviews and remediation to maintain and improve compliance.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
          <p>
            We have taken the following measures to ensure accessibility of our website:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Semantic HTML markup for clear document structure</li>
            <li>Sufficient color contrast ratios throughout the design</li>
            <li>Alt text provided for all meaningful images</li>
            <li>Keyboard navigation support for all interactive elements</li>
            <li>ARIA attributes where necessary to enhance assistive technology support</li>
            <li>Resizable text without loss of content or functionality</li>
            <li>Consistent and predictable navigation across all pages</li>
            <li>An accessibility tools widget available on every page</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Accessibility Tools</h2>
          <p>
            Our website includes a built-in accessibility tools widget that provides options such as enhanced contrast, text resizing, readable fonts, highlight links, and more. You can activate it by clicking the accessibility icon on any page, or by using the link in the footer.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Compatibility</h2>
          <p>
            Our website is designed to be compatible with the following assistive technologies:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Screen readers (including NVDA, JAWS, and VoiceOver)</li>
            <li>Screen magnification software</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
          </ul>
          <p>
            Our website is designed to be compatible with the last two versions of all major browsers including Chrome, Firefox, Safari, and Edge.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Technical Specifications</h2>
          <p>
            Accessibility of our website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>SVG</li>
            <li>WAI-ARIA</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
          <p>
            Despite our best efforts to ensure accessibility of our website, there may be some limitations. We are continually seeking solutions to bring all areas of our site up to the same level of overall accessibility. If you encounter an issue, please contact us so we can provide the information you need through an alternative method and work to fix the issue.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Assessment Approach</h2>
          <p>
            Handyman Wannabe assesses the accessibility of our website through self-evaluation, automated testing tools, and periodic manual reviews.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers:
          </p>
          <p>
            E-mail: <a href="mailto:support@websitewannabe.com">support@websitewannabe.com</a>
          </p>
          <p>
            We usually respond to accessibility feedback within 3-5 business days. If you do not receive a reply to your e-mail within 10 business days, you can contact Website Wannabe at (267) 500-2928.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Formal Approval</h2>
          <p>
            This Accessibility Statement is formally approved by Website Wannabe on behalf of Handyman Wannabe.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Last updated: March 31, 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityPage;
