import { useRef } from "react";
import useWindowStoreMob from "@store/app.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MobileWrapControl = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { activeApp, closeApp } = useWindowStoreMob();
    const isOpen = activeApp === windowKey;
    
    const containerRef = useRef(null);
    const panelRef = useRef(null);

    useGSAP(() => {
      const container = containerRef.current;
      const panel = panelRef.current;
      
      if (!container || !panel) return;

      if (isOpen) {
        // Show container and enable clicks instantly
        gsap.set(container, { autoAlpha: 1, pointerEvents: "auto" });
        
        // Slide down the entire blurred full-screen panel
        gsap.fromTo(
          panel,
          { y: "-100%" },
          { y: "0%", duration: 0.4, ease: "power3.out" }
        );
      } else {
        // Slide up
        gsap.to(panel, {
          y: "-100%",
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            // Hide container and disable clicks
            gsap.set(container, { autoAlpha: 0, pointerEvents: "none" });
          }
        });
      }
    }, [isOpen]);

    return (
      <div
        ref={containerRef}
        style={{ zIndex: 40, visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        className="fixed inset-0 w-screen h-screen overflow-hidden"
      >
        {/* Full Screen Sliding Panel with Blur */}
        <div 
          ref={panelRef}
          className="absolute inset-0 w-full h-full bg-black/20 dark:bg-black/50 backdrop-blur-2xl flex flex-col"
          style={{ transform: "translateY(-100%)" }}
          onClick={(e) => {
            // Close if clicking the empty space of the panel itself
            if (e.target === e.currentTarget) closeApp();
          }}
        >
          <Component {...props} />
        </div>
      </div>
    );
  };

  Wrapped.displayName = `MobileWrapControl(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default MobileWrapControl;