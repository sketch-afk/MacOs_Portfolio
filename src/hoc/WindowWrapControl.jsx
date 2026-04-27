import { useRef } from "react";
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const WindowWrapControl = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { windows } = useWindowStore();
    const windowState = windows[windowKey] || {};
    const { isOpen, zIndex } = windowState;
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = "block";
        gsap.fromTo(
          el,
          { scale: 0.95, opacity: 0, y: -15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }
        );
      } else {
        if (el.style.display === "block") {
          gsap.to(el, {
            scale: 0.95, opacity: 0, y: -10, duration: 0.15, ease: "power2.in",
            onComplete: () => {
              el.style.display = "none";
            },
          });
        } else {
          el.style.display = "none";
        }
      }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute top-10 right-2" 
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapControl(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapControl;