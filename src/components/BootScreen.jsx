import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const BootScreen = ({ onBootComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        if (onBootComplete) onBootComplete();
      },
    });

    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power1.inOut",
    }).to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "+=0.3",
    );
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      <svg
        className="w-24 h-24 text-white mb-16"
        fill="currentColor"
        viewBox="0 0 384 512"
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>

      <div className="w-56 h-1.5 bg-[#333333] rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-white w-0 rounded-full"
        ></div>
      </div>
    </div>
  );
};

export default BootScreen;
