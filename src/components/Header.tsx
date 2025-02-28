//Header.tsx (assuming this is where the navigation is located)

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          My Website
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/services" className="nav-link">
            Services
          </NavLink>
          <NavLink to="/packages" className="nav-link">
            Packages
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </div>
      </div>
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="bg-gray-800 p-4">
          <NavLink
            to="/"
            className="block py-2 px-4 hover:bg-gray-100 transition-colors w-full text-left"
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className="block py-2 px-4 hover:bg-gray-100 transition-colors w-full text-left"
            onClick={toggleMenu}
          >
            Services
          </NavLink>
          <NavLink
            to="/packages"
            className="block py-2 px-4 hover:bg-gray-100 transition-colors w-full text-left"
            onClick={toggleMenu}
          >
            Packages
          </NavLink>
          <NavLink
            to="/about"
            className="block py-2 px-4 hover:bg-gray-100 transition-colors w-full text-left"
            onClick={toggleMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="block py-2 px-4 hover:bg-gray-100 transition-colors w-full text-left"
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

//App.tsx (assuming this is where the routes are defined)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Header from './components/Header'; // Assuming Header is in a components folder
//import Packages from './pages/Packages'; // Needs a Packages page component


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/packages" element={<Packages />} /> */} {/* Needs a Packages page component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;