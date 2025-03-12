
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const scrollPositionsRef = useRef<Record<string, number>>({});
  const prevPathRef = useRef<string>(pathname);
  const isInitialRenderRef = useRef<boolean>(true);
  
  // Get stored positions on initial mount
  useEffect(() => {
    try {
      const storedPositions = sessionStorage.getItem('scrollPositions');
      if (storedPositions) {
        scrollPositionsRef.current = JSON.parse(storedPositions);
      }
    } catch (error) {
      console.error('Error loading scroll positions:', error);
    }
    
    // Function to save scroll positions to session storage
    const saveScrollPositions = () => {
      try {
        scrollPositionsRef.current[pathname] = window.scrollY;
        sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositionsRef.current));
      } catch (error) {
        console.error('Error saving scroll positions:', error);
      }
    };
    
    // Save scroll position before unloading the page
    window.addEventListener('beforeunload', saveScrollPositions);
    
    return () => {
      window.removeEventListener('beforeunload', saveScrollPositions);
      
      // Save current scroll position when component unmounts
      saveScrollPositions();
    };
  }, []);
  
  useEffect(() => {
    // Skip on initial render
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }
    
    // We're changing routes
    if (prevPathRef.current !== pathname) {
      // Store scroll position of the previous page
      scrollPositionsRef.current[prevPathRef.current] = window.scrollY;
      
      try {
        sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositionsRef.current));
      } catch (error) {
        console.error('Error saving scroll positions:', error);
      }
      
      // Restore scroll position or scroll to top for the new route
      if (scrollPositionsRef.current[pathname]) {
        // Wait for DOM to be ready before scrolling
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionsRef.current[pathname]);
        });
      } else {
        // New page visit - scroll to top
        window.scrollTo(0, 0);
      }
      
      // Update previous path
      prevPathRef.current = pathname;
    }
  }, [pathname]);
  
  return null;
};

export default ScrollRestoration;
