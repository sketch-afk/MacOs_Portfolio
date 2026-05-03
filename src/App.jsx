import React, { useState } from "react";

import { Navbar, Welcome, Dock, Home } from "#components";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos, Launchpad, Control, Vscode, Weather } from "#windows";

import { Draggable } from "gsap/Draggable";
import { gsap } from "gsap";
import BootScreen from "#components/BootScreen";
import { useIsMobile } from "#hooks/useIsMobile";
import {Mobile , Terminalmob }  from "@windows";
gsap.registerPlugin(Draggable);

const App = () => {
  const [isBooted, setIsBooted] = useState(false);
  const isMobile = useIsMobile();

  // if (isMobile) {
  //   return (
  //     <>
  //       {!isBooted && <BootScreen onBootComplete={() => setIsBooted(true)} />}
  //         {isBooted && (<>
  //           <Mobile />
  //           <Terminalmob />
  //         </>)}
  //     </>
  //   )
  // }

  return (
    <main>
      {!isBooted && <BootScreen onBootComplete={() => setIsBooted(true)} />}
        {isBooted && (
          <>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Home />
      <Photos />
      <Launchpad />
      <Control />
      <Vscode />
      <Weather />
      </>
        )}
    </main>
  );
};

export default App;
