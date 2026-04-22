import React from "react";
import { Navbar, Welcome, Dock } from "#components";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact } from "#windows";

import { Draggable } from "gsap/draggable";
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
    </main>
  );
};

export default App;
