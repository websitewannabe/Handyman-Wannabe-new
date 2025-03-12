import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import ScrollRestoration from './components/ScrollRestoration';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutUsPage from './pages/AboutUsPage';
import CareersPage from './pages/CareersPage';
import MeetTeamPage from './pages/MeetTeamPage';
import ContactPage from './pages/ContactPage';
import ServiceAreaPage from './pages/ServiceAreaPage';
import FAQPage from './pages/FAQPage';
import CarpentryPage from './pages/CarpentryPage';
import GarageDoorsPage from './pages/GarageDoorsPage';
import SmartHomesPage from './pages/SmartHomesPage';
import LocksmithingPage from './pages/LocksmithingPage';
import FurnitureAssemblyPage from './pages/FurnitureAssemblyPage';
import ElectricalPage from './pages/ElectricalPage';
import PaintingDrywallPage from './pages/PaintingDrywallPage';
import LandscapingPage from './pages/LandscapingPage';
import HomeSecurityPage from './pages/HomeSecurityPage';
import PowerwashingPage from './pages/PowerwashingPage';
import WindowsDoorsPage from './pages/WindowsDoorsPage';
import HolidayLightingPage from './pages/HolidayLightingPage';
import PlumbingPage from './pages/PlumbingPage';
import PoolsSpasPage from './pages/PoolsSpasPage';
import FlooringPage from './pages/FlooringPage';
import CleaningPage from './pages/CleaningPage';
import ThirdPartyMovingPage from './pages/ThirdPartyMovingPage';
import HomeInspectionsPage from './pages/HomeInspectionsPage';
import ServiceDirectoryPage from './pages/ServiceDirectoryPage';
import ManagementCompaniesPage from './pages/ManagementCompaniesPage';
import MiscPage from './pages/MiscPage';
import BlogPage from './pages/BlogPage';
import PackagesPage from './pages/PackagesPage';
import SitemapPage from './pages/SitemapPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import MobileServicesPage from "./components/MobileServicesPage";
import AccessibilityPage from "./pages/AccessibilityPage"; // Added import
import PrivacyPage from "./pages/PrivacyPage"; // Added import for Privacy Page
import TermsPage from "./pages/TermsPage"; // Added import for Terms of Service Page
import DisclaimerPage from "./pages/DisclaimerPage"; // Added import for Disclaimer Page


function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen">
          <ScrollRestoration />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/meet-the-team" element={<MeetTeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/service-area" element={<ServiceAreaPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/services/carpentry" element={<CarpentryPage />} />
            <Route path="/services/garage-doors" element={<GarageDoorsPage />} />
            <Route path="/services/smart-homes" element={<SmartHomesPage />} />
            <Route path="/services/locksmithing" element={<LocksmithingPage />} />
            <Route path="/services/furniture-assembly" element={<FurnitureAssemblyPage />} />
            <Route path="/services/electrical" element={<ElectricalPage />} />
            <Route path="/services/painting-drywall" element={<PaintingDrywallPage />} />
            <Route path="/services/landscaping" element={<LandscapingPage />} />
            <Route path="/services/home-security" element={<HomeSecurityPage />} />
            <Route path="/services/powerwashing" element={<PowerwashingPage />} />
            <Route path="/services/windows-doors" element={<WindowsDoorsPage />} />
            <Route path="/services/holiday-lighting" element={<HolidayLightingPage />} />
            <Route path="/services/plumbing" element={<PlumbingPage />} />
            <Route path="/services/pools-spas" element={<PoolsSpasPage />} />
            <Route path="/services/flooring" element={<FlooringPage />} />
            <Route path="/services/cleaning" element={<CleaningPage />} />
            <Route path="/services/third-party-moving" element={<ThirdPartyMovingPage />} />
            <Route path="/services/home-inspections" element={<HomeInspectionsPage />} />
            <Route path="/services/management-companies" element={<ManagementCompaniesPage />} />
            <Route path="/services/misc" element={<MiscPage />} />
            <Route path="/service-directory" element={<ServiceDirectoryPage />} />
            <Route path="/services" element={<ServiceDirectoryPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/privacy" element={<PrivacyPage />} /> {/* Added Privacy Policy route */}
            <Route path="/terms" element={<TermsPage />} /> {/* Added Terms of Service route */}
            <Route path="/disclaimer" element={<DisclaimerPage />} /> {/* Added Disclaimer route */}
            <Route path="/accessibility" element={<AccessibilityPage />} /> {/* Added route */}
            <Route path="/mobileservicespage" element={<MobileServicesPage onClose={() => window.history.back()} />} />
            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;