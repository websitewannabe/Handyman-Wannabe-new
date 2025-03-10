import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Only import HomePage directly as it's the landing page
import HomePage from './pages/HomePage';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Lazy load all other pages
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const MeetTeamPage = lazy(() => import('./pages/MeetTeamPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServiceAreaPage = lazy(() => import('./pages/ServiceAreaPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

// Lazy load service pages
const CarpentryPage = lazy(() => import('./pages/CarpentryPage'));
const GarageDoorsPage = lazy(() => import('./pages/GarageDoorsPage'));
const SmartHomesPage = lazy(() => import('./pages/SmartHomesPage'));
const LocksmithingPage = lazy(() => import('./pages/LocksmithingPage'));
const FurnitureAssemblyPage = lazy(() => import('./pages/FurnitureAssemblyPage'));
const ElectricalPage = lazy(() => import('./pages/ElectricalPage'));
const PaintingDrywallPage = lazy(() => import('./pages/PaintingDrywallPage'));
const LandscapingPage = lazy(() => import('./pages/LandscapingPage'));
const HomeSecurityPage = lazy(() => import('./pages/HomeSecurityPage'));
const PowerwashingPage = lazy(() => import('./pages/PowerwashingPage'));
const WindowsDoorsPage = lazy(() => import('./pages/WindowsDoorsPage'));
const HolidayLightingPage = lazy(() => import('./pages/HolidayLightingPage'));
const PlumbingPage = lazy(() => import('./pages/PlumbingPage'));
const PoolsSpasPage = lazy(() => import('./pages/PoolsSpasPage'));
const FlooringPage = lazy(() => import('./pages/FlooringPage'));
const CleaningPage = lazy(() => import('./pages/CleaningPage'));
const ThirdPartyMovingPage = lazy(() => import('./pages/ThirdPartyMovingPage'));
const HomeInspectionsPage = lazy(() => import('./pages/HomeInspectionsPage'));
const ServiceDirectoryPage = lazy(() => import('./pages/ServiceDirectoryPage'));
const ManagementCompaniesPage = lazy(() => import('./pages/ManagementCompaniesPage'));
const MiscPage = lazy(() => import('./pages/MiscPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const MobileServicesPage = lazy(() => import("./components/MobileServicesPage"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            {/* HomePage is not lazy loaded since it's the landing page */}
            <Route path="/" element={<HomePage />} />
            
            {/* All other routes are wrapped in Suspense for code splitting */}
            <Route path="/how-it-works" element={
              <Suspense fallback={<PageLoader />}>
                <HowItWorksPage />
              </Suspense>
            } />
            <Route path="/about-us" element={
              <Suspense fallback={<PageLoader />}>
                <AboutUsPage />
              </Suspense>
            } />
            <Route path="/careers" element={
              <Suspense fallback={<PageLoader />}>
                <CareersPage />
              </Suspense>
            } />
            <Route path="/meet-the-team" element={
              <Suspense fallback={<PageLoader />}>
                <MeetTeamPage />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            } />
            <Route path="/service-area" element={
              <Suspense fallback={<PageLoader />}>
                <ServiceAreaPage />
              </Suspense>
            } />
            <Route path="/faq" element={
              <Suspense fallback={<PageLoader />}>
                <FAQPage />
              </Suspense>
            } />
            <Route path="/blog" element={
              <Suspense fallback={<PageLoader />}>
                <BlogPage />
              </Suspense>
            } />
            <Route path="/packages" element={
              <Suspense fallback={<PageLoader />}>
                <PackagesPage />
              </Suspense>
            } />
            
            {/* Service pages */}
            <Route path="/services/carpentry" element={
              <Suspense fallback={<PageLoader />}>
                <CarpentryPage />
              </Suspense>
            } />
            <Route path="/services/garage-doors" element={
              <Suspense fallback={<PageLoader />}>
                <GarageDoorsPage />
              </Suspense>
            } />
            <Route path="/services/smart-homes" element={
              <Suspense fallback={<PageLoader />}>
                <SmartHomesPage />
              </Suspense>
            } />
            <Route path="/services/locksmithing" element={
              <Suspense fallback={<PageLoader />}>
                <LocksmithingPage />
              </Suspense>
            } />
            <Route path="/services/furniture-assembly" element={
              <Suspense fallback={<PageLoader />}>
                <FurnitureAssemblyPage />
              </Suspense>
            } />
            <Route path="/services/electrical" element={
              <Suspense fallback={<PageLoader />}>
                <ElectricalPage />
              </Suspense>
            } />
            <Route path="/services/painting-drywall" element={
              <Suspense fallback={<PageLoader />}>
                <PaintingDrywallPage />
              </Suspense>
            } />
            <Route path="/services/landscaping" element={
              <Suspense fallback={<PageLoader />}>
                <LandscapingPage />
              </Suspense>
            } />
            <Route path="/services/home-security" element={
              <Suspense fallback={<PageLoader />}>
                <HomeSecurityPage />
              </Suspense>
            } />
            <Route path="/services/powerwashing" element={
              <Suspense fallback={<PageLoader />}>
                <PowerwashingPage />
              </Suspense>
            } />
            <Route path="/services/windows-doors" element={
              <Suspense fallback={<PageLoader />}>
                <WindowsDoorsPage />
              </Suspense>
            } />
            <Route path="/services/holiday-lighting" element={
              <Suspense fallback={<PageLoader />}>
                <HolidayLightingPage />
              </Suspense>
            } />
            <Route path="/services/plumbing" element={
              <Suspense fallback={<PageLoader />}>
                <PlumbingPage />
              </Suspense>
            } />
            <Route path="/services/pools-spas" element={
              <Suspense fallback={<PageLoader />}>
                <PoolsSpasPage />
              </Suspense>
            } />
            <Route path="/services/flooring" element={
              <Suspense fallback={<PageLoader />}>
                <FlooringPage />
              </Suspense>
            } />
            <Route path="/services/cleaning" element={
              <Suspense fallback={<PageLoader />}>
                <CleaningPage />
              </Suspense>
            } />
            <Route path="/services/third-party-moving" element={
              <Suspense fallback={<PageLoader />}>
                <ThirdPartyMovingPage />
              </Suspense>
            } />
            <Route path="/services/home-inspections" element={
              <Suspense fallback={<PageLoader />}>
                <HomeInspectionsPage />
              </Suspense>
            } />
            <Route path="/services/management-companies" element={
              <Suspense fallback={<PageLoader />}>
                <ManagementCompaniesPage />
              </Suspense>
            } />
            <Route path="/services/misc" element={
              <Suspense fallback={<PageLoader />}>
                <MiscPage />
              </Suspense>
            } />
            <Route path="/service-directory" element={
              <Suspense fallback={<PageLoader />}>
                <ServiceDirectoryPage />
              </Suspense>
            } />
            <Route path="/services" element={
              <Suspense fallback={<PageLoader />}>
                <ServiceDirectoryPage />
              </Suspense>
            } />
            <Route path="/sitemap" element={
              <Suspense fallback={<PageLoader />}>
                <SitemapPage />
              </Suspense>
            } />
            <Route path="/mobileservicespage" element={
              <Suspense fallback={<PageLoader />}>
                <MobileServicesPage onClose={() => window.history.back()} />
              </Suspense>
            } />
            {/* Catch-all route for 404 errors */}
            <Route path="*" element={
              <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </Suspense>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;