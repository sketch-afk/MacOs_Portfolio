import React from "react";
import { Navbar, Welcome, Dock, Home } from "#components";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos, Launchpad } from "#windows";

import { Draggable } from "gsap/Draggable";
import { gsap } from "gsap";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
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
    </main>
  );
};

export default App;
