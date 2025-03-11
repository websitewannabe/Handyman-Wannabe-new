
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Handyman Wannabe</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Helmet>

      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 pt-40 pb-16 bg-gray-50 notfound-page">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Contact Us <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
