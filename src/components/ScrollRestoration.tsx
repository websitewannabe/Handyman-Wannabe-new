
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Store scroll position before navigation
    const scrollPositions = sessionStorage.getItem('scrollPositions') 
      ? JSON.parse(sessionStorage.getItem('scrollPositions') || '{}') 
      : {};
    
    // Save current scroll position when leaving the page
    return () => {
      scrollPositions[pathname] = window.scrollY;
      sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositions));
    };
  }, [pathname]);

  useEffect(() => {
    // Restore scroll position when navigating back to a page
    const scrollPositions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
    const savedPosition = scrollPositions[pathname];
    
    if (savedPosition) {
      // Use a small timeout to ensure the DOM has fully rendered
      const timer = setTimeout(() => {
        window.scrollTo(0, savedPosition);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      // Scroll to top only for new page visits (not on back navigation)
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollRestoration;
