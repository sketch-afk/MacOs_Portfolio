import { useRef } from "react";
import useWindowStoreMob from "@store/app.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MobileWrapLaunch = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { activeApp, closeApp } = useWindowStoreMob();
    const isOpen = activeApp === windowKey;
    
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const backdropRef = useRef(null);

    useGSAP(() => {
      const container = containerRef.current;
      const content = contentRef.current;
      const backdrop = backdropRef.current;
      
      if (!container || !content || !backdrop) return;

      if (isOpen) {
        // Instantly display and enable interactions
        gsap.set(container, { autoAlpha: 1, pointerEvents: "auto" });
        
        // Heavy iOS-style blur for backdrop
        gsap.fromTo(
          backdrop,
          { opacity: 0, backdropFilter: "blur(0px)" },
          { opacity: 1, backdropFilter: "blur(15px)", duration: 0.3, ease: "power2.out" }
        );

        // iOS style pop-in: slight scale up and fade in
        gsap.fromTo(
          content,
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
        );
      } else {
        // Fade out blur
        gsap.to(backdrop, {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.3,
          ease: "power2.in"
        });

        // Scale down and fade out content
        gsap.to(content, {
          scale: 0.95,
          opacity: 0,
          y: 10,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(container, { autoAlpha: 0, pointerEvents: "none" });
          }
        });
      }
    }, [isOpen]);

    return (
      <div
        ref={containerRef}
        style={{ zIndex: 100, visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-start"
      >
        {/* iOS Blurred Background Layer */}
        <div 
          ref={backdropRef}
          className="absolute inset-0 bg-black/40"
          onClick={() => closeApp()}
        />

        {/* Content Container */}
        <div 
          ref={contentRef}
          className="relative w-full h-full z-10 flex flex-col"
        >
          <Component {...props} />
        </div>
      </div>
    );
  };

  Wrapped.displayName = `MobileWrapLaunch(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default MobileWrapLaunch;