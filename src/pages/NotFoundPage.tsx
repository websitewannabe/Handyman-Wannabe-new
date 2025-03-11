import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Handyman Wannabe</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Helmet>

      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 bg-gray-50"> {/* Added pt-20 for top padding */}
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-gray-600 text-lg mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="btn-primary inline-flex items-center"
            >
              <span className="mr-2">Return Home</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </Link>

            <Link 
              to="/service-directory" 
              className="btn-secondary inline-flex items-center"
            >
              <span className="mr-2">Browse Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </Link>
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Looking for something specific?</h3>
            <p className="text-gray-600 mb-4">
              Try one of these popular pages:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              <li>
                <Link to="/services/carpentry" className="text-secondary hover:text-primary transition-colors">
                  Carpentry Services
                </Link>
              </li>
              <li>
                <Link to="/services/electrical" className="text-secondary hover:text-primary transition-colors">
                  Electrical Services
                </Link>
              </li>
              <li>
                <Link to="/services/plumbing" className="text-secondary hover:text-primary transition-colors">
                  Plumbing Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-secondary hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-secondary hover:text-primary transition-colors">
                  View Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;