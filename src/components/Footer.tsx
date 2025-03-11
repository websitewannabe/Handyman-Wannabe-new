import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  AtSign,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img
                src="/images/Handyman_Logo.png"
                alt="Handyman Wannabe"
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400">
                Professional handyman services for all your home improvement
                needs.
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services/carpentry"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Carpentry
                </Link>
              </li>
              <li>
                <Link
                  to="/services/electrical"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Electrical
                </Link>
              </li>
              <li>
                <Link
                  to="/services/plumbing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Plumbing
                </Link>
              </li>
              <li>
                <Link
                  to="/services/painting-drywall"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Painting & Drywall
                </Link>
              </li>
              <li>
                <Link
                  to="/services/smart-homes"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Smart Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services/home-security"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home Security
                </Link>
              </li>
            </ul>
          </div>

          {/* More Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">More Services</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services/windows-doors"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Windows & Doors
                </Link>
              </li>
              <li>
                <Link
                  to="/services/garage-doors"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Garage Doors
                </Link>
              </li>
              <li>
                <Link
                  to="/services/landscaping"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Landscaping
                </Link>
              </li>
              <li>
                <Link
                  to="/services/powerwashing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Powerwashing
                </Link>
              </li>
              <li>
                <Link
                  to="/services/pools-spas"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pools & Spas
                </Link>
              </li>
              <li>
                <Link
                  to="/services/holiday-lighting"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Holiday Lighting
                </Link>
              </li>
            </ul>
          </div>

          {/* Site Structure */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/meet-the-team"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Meet Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/service-area"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Service Areas
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-primary mt-1 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Call Us</p>
                <p className="text-lg font-bold">(719) 315-6628</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-primary mt-1 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Visit Us</p>
                <p className="text-lg font-bold">Colorado Springs, CO</p>
                <p className="text-gray-400">Greater Metropolitan Area</p>
              </div>
            </div>

            <div className="flex items-start">
              <AtSign className="w-5 h-5 text-primary mt-1 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Email Us</p>
                <p className="text-lg font-bold">info@handymanwannabe.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; 2025 Handyman Wannabe. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/accessibility"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Accessibility Statement
              </Link>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;