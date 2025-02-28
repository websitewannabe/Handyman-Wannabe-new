// Header.tsx
import Link from 'next/link';

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Packages", href: "/packages" },
  { title: "About Us", href: "/about" },
  { title: "FAQ", href: "/faq" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
];

const Header = () => {
  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li key={item.title}>
            <Link href={item.href}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;

// App.tsx (example, needs further details for routing)
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
// ... other imports

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/services', element: <Services /> },
  // ... other routes
  {path: '/careers', element: <CareersPage/>}, // Add Careers route.  CareersPage component needs to be created.
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;


// Placeholder for CareersPage.tsx -  Needs to be fully implemented.
// CareersPage.tsx
import React from 'react';


const CareersPage = () => {
  return (
    <div>
      <h1>Careers Page</h1>
      {/* Add job listings and application form logic here */}
    </div>
  );
};

export default CareersPage;