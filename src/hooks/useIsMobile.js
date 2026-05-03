import { MOBILE_BREAKPOINT } from "#constants";
import { useState, useEffect } from "react";



export function useIsMobile() {
  // Check the window size immediately when the app loads
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false;
  });

  useEffect(() => {
    // Whenever the window resizes, check the width again
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Start listening for window changes
    window.addEventListener("resize", handleResize);
    
    // Double-check the size on initial load just to be safe
    handleResize();

    // Clean up the listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}