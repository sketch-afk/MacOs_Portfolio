import React, { useState, Suspense, lazy } from "react";

import { Draggable } from "gsap/Draggable";
import { gsap } from "gsap";
import BootScreen from "#components/BootScreen";
import { useIsMobile } from "#hooks/useIsMobile";

gsap.registerPlugin(Draggable);

const DesktopApp = lazy(() => import('./DesktopApp'));
const MobileApp = lazy(() => import('./MobileApp'));

const App = () => {
  const [isBooted, setIsBooted] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      {!isBooted && <BootScreen onBootComplete={() => setIsBooted(true)} />}
      {isBooted && (
        <Suspense fallback={<div style={{ width: '100vw', height: '100vh', backgroundColor: '#000' }}></div>}>
          {isMobile ? <MobileApp /> : <DesktopApp />}
        </Suspense>
      )}
    </>
  );
};

export default App;
