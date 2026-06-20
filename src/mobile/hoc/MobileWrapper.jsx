import { useRef } from "react";
import useWindowStoreMob from "@store/app.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MobileWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { activeApp } = useWindowStoreMob();
    const isOpen = activeApp === windowKey;
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = "block";
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: "100%", // Slide up from bottom like an iOS app
          },
          {
            opacity: 1,
            y: "0%",
            duration: 0.3,
            ease: "power3.out",
          }
        );
      } else {
        // Animate out
        gsap.to(el, {
          opacity: 0,
          y: "100%",
          duration: 0.2,
          ease: "power3.in",
          onComplete: () => {
            el.style.display = "none";
          }
        });
      }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          display: isOpen ? "block" : "none", // Initially manage display
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 50, // Always on top when active
        }}
        className="fixed bg-white dark:bg-black overflow-y-auto" // Full screen, scrollable
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `MobileWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default MobileWrapper;
