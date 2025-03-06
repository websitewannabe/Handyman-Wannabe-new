
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SitemapPage: React.FC = () => {
  // Site structure data
  const siteStructure = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", url: "/" },
        { name: "Process", url: "/how-it-works" },
        { name: "Packages", url: "/packages" },
        { name: "Service Area", url: "/service-area" },
        { name: "Blog", url: "/blog" },
        { name: "Service Directory", url: "/service-directory" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "About Us", url: "/about-us" },
        { name: "Meet the Team", url: "/meet-the-team" },
        { name: "Careers", url: "/careers" },
        { name: "FAQ", url: "/faq" },
        { name: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Home Improvement",
      links: [
        { name: "Carpentry", url: "/services/carpentry" },
        { name: "Furniture Assembly", url: "/services/furniture-assembly" },
        { name: "Windows & Doors", url: "/services/windows-doors" },
        { name: "Painting & Drywall", url: "/services/painting-drywall" },
        { name: "Flooring", url: "/services/flooring" },
      ],
    },
    {
      title: "Outdoor Services",
      links: [
        { name: "Landscaping", url: "/services/landscaping" },
        { name: "Powerwashing", url: "/services/powerwashing" },
        { name: "Holiday Lighting", url: "/services/holiday-lighting" },
        { name: "Pools & Spas", url: "/services/pools-spas" },
      ],
    },
    {
      title: "Technical Services",
      links: [
        { name: "Electrical", url: "/services/electrical" },
        { name: "Plumbing", url: "/services/plumbing" },
        { name: "Smart Homes", url: "/services/smart-homes" },
        { name: "Home Security", url: "/services/home-security" },
        { name: "Garage Doors", url: "/services/garage-doors" },
        { name: "Locksmithing", url: "/services/locksmithing" },
      ],
    },
    {
      title: "Additional Services",
      links: [
        { name: "Cleaning", url: "/services/cleaning" },
        { name: "Third-Party Moving", url: "/services/third-party-moving" },
        { name: "Home Inspections", url: "/services/home-inspections" },
        { name: "Management Companies", url: "/services/management-companies" },
        { name: "Misc Services", url: "/services/misc" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Sitemap - Handyman Wannabe</title>
        <meta name="description" content="Complete site structure and navigation guide for Handyman Wannabe services." />
      </Helmet>
      
      <h1 className="text-3xl font-bold text-center mb-10">Sitemap</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteStructure.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="hover:text-primary transition-colors">
                  <Link to={link.url} className="flex items-center">
                    <span className="mr-2">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-gray-600">
          Can't find what you're looking for? 
          <Link to="/contact" className="text-primary ml-1 hover:underline">
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SitemapPage;
