import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SitemapPage: React.FC = () => {
  const routes = [
    { path: "/", name: "Home" },
    { path: "/how-it-works", name: "How It Works" },
    { path: "/about-us", name: "About Us" },
    { path: "/careers", name: "Careers" },
    { path: "/meet-the-team", name: "Meet The Team" },
    { path: "/contact", name: "Contact" },
    { path: "/service-area", name: "Service Area" },
    { path: "/faq", name: "FAQ" },
    { path: "/blog", name: "Blog" },
    { path: "/packages", name: "Packages" },
    { path: "/service-directory", name: "Service Directory" },
    { path: "/services/carpentry", name: "Carpentry" },
    { path: "/services/garage-doors", name: "Garage Doors" },
    { path: "/services/smart-homes", name: "Smart Homes" },
    { path: "/services/locksmithing", name: "Locksmithing" },
    { path: "/services/furniture-assembly", name: "Furniture Assembly" },
    { path: "/services/electrical", name: "Electrical" },
    { path: "/services/painting-drywall", name: "Painting & Drywall" },
    { path: "/services/landscaping", name: "Landscaping" },
    { path: "/services/home-security", name: "Home Security" },
    { path: "/services/powerwashing", name: "Power Washing" },
    { path: "/services/windows-doors", name: "Windows & Doors" },
    { path: "/services/holiday-lighting", name: "Holiday Lighting" },
    { path: "/services/plumbing", name: "Plumbing" },
    { path: "/services/pools-spas", name: "Pools & Spas" },
    { path: "/services/flooring", name: "Flooring" },
    { path: "/services/cleaning", name: "Cleaning" },
    { path: "/services/third-party-moving", name: "Third Party Moving" },
    { path: "/services/home-inspections", name: "Home Inspections" },
    { path: "/services/management-companies", name: "Management Companies" },
    { path: "/services/misc", name: "Miscellaneous Services" },
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap | Handyman Wannabe</title>
        <meta name="description" content="Browse all pages on Handyman Wannabe's website through our sitemap." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Sitemap</h1>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <p className="mb-6 text-gray-600">
            Below you'll find a complete list of all pages on our website. For a machine-readable version, see our <a href="/sitemap.xml" className="text-orange-500 hover:underline" target="_blank" rel="noopener noreferrer">XML sitemap</a>.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <li key={route.path}>
                <Link 
                  to={route.path} 
                  className="block p-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SitemapPage;