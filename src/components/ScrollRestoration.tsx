
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const previousPathRef = useRef<string>(pathname);
  const isFirstRenderRef = useRef<boolean>(true);
  const disableScrollRestorationRef = useRef<boolean>(false);
  
  // Used to store scroll positions for different routes
  const scrollPositionsRef = useRef<Record<string, number>>({});
  
  // Load stored scroll positions on mount
  useEffect(() => {
    try {
      const storedPositions = sessionStorage.getItem('scrollPositions');
      if (storedPositions) {
        scrollPositionsRef.current = JSON.parse(storedPositions);
      }
    } catch (error) {
      console.error('Error loading scroll positions:', error);
    }
    
    // Make sure browser's default scroll restoration is disabled
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Function to save all scroll positions
    const saveAllScrollPositions = () => {
      if (disableScrollRestorationRef.current) return;
      
      // Save current scroll position for current page
      scrollPositionsRef.current[pathname] = window.scrollY;
      
      try {
        sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositionsRef.current));
      } catch (error) {
        console.error('Error saving scroll positions:', error);
      }
    };
    
    // Save positions before unloading the page
    window.addEventListener('beforeunload', saveAllScrollPositions);
    
    return () => {
      window.removeEventListener('beforeunload', saveAllScrollPositions);
      saveAllScrollPositions();
    };
  }, []);
  
  // Handle scroll position on route changes
  useEffect(() => {
    // Skip first render since this would cause an initial unwanted scroll
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    
    // Temporarily disable scroll restoration to prevent infinite loops
    disableScrollRestorationRef.current = true;
    
    // This is a route change
    if (previousPathRef.current !== pathname) {
      // Save scroll position for previous page
      scrollPositionsRef.current[previousPathRef.current] = window.scrollY;
      
      try {
        sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositionsRef.current));
      } catch (error) {
        console.error('Error saving scroll positions:', error);
      }
      
      // Update previous path reference
      previousPathRef.current = pathname;
      
      // Create a small delay to ensure the DOM has updated
      setTimeout(() => {
        // Restore position if we have it for this route
        if (scrollPositionsRef.current[pathname] !== undefined) {
          window.scrollTo(0, scrollPositionsRef.current[pathname]);
        } else {
          // New page - scroll to top
          window.scrollTo(0, 0);
        }
        
        // Re-enable scroll restoration after applying the scroll
        disableScrollRestorationRef.current = false;
      }, 50);
    } else {
      // Re-enable scroll restoration after checking
      disableScrollRestorationRef.current = false;
    }
  }, [pathname]);
  
  // Add a scroll listener to update positions as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (disableScrollRestorationRef.current) return;
      
      // Debounce the scroll event
      if (handleScroll.timeout) {
        clearTimeout(handleScroll.timeout);
      }
      
      handleScroll.timeout = setTimeout(() => {
        scrollPositionsRef.current[pathname] = window.scrollY;
        
        try {
          sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositionsRef.current));
        } catch (error) {
          console.error('Error saving scroll position on scroll:', error);
        }
      }, 100);
    };
    
    // @ts-ignore - adding a custom property to the function
    handleScroll.timeout = null;
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // @ts-ignore - clear the timeout on cleanup
      if (handleScroll.timeout) {
        // @ts-ignore
        clearTimeout(handleScroll.timeout);
      }
    };
  }, [pathname]);
  
  return null;
};

export default ScrollRestoration;
