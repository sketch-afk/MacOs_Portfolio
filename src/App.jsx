import React, { useState } from "react";
import { Navbar, Welcome, Dock, Home } from "#components";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos, Launchpad } from "#windows";

import { Draggable } from "gsap/Draggable";
import { gsap } from "gsap";
import BootScreen from "#components/BootScreen";
gsap.registerPlugin(Draggable);

const App = () => {
  const [isBooted, setIsBooted] = useState(false);

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
      </>
        )}
    </main>
  );
};

export default App;
