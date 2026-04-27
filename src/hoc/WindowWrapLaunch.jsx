import { useLayoutEffect, useRef } from "react";
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Removed the Draggable import entirely!

const WindowWrapLaunch = (Component, windowKey) => {
  const Wrapped = (props) => {
    // Removed focusWindow from destructuring since Draggable is gone
    const { windows } = useWindowStore(); 
    const { isOpen, zIndex, isMaximized } = windows[windowKey];
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      // macOS Launchpad Animation: Slight scale down from 1.05 and fade in
      gsap.fromTo(
        el,
        {
          scale: 1.05, 
          opacity: 0,
        },
        {
          scale: 1, 
          opacity: 1,
          duration: 0.3, // Slightly longer duration for a buttery smooth fade
          ease: "power3.out",
        }
      );
    }, [isOpen]);

    // The entire useGSAP Draggable block was deleted here

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          ...(isMaximized
            ? {
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                borderRadius: 0,
              }
            : {}),
        }}
        className="absolute inset-0" // Added inset-0 to help ensure it covers the screen
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapLaunch;