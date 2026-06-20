import React from "react";
import { Navbar, Welcome, Dock, Home } from "#components";
import {
  Terminal,
  Safari,
  Resume,
  Finder,
  Text,
  Image,
  Contact,
  Photos,
  Launchpad,
  Control,
  Vscode,
  Weather,
} from "#windows";

const DesktopApp = () => {
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
      <Control />
      <Vscode />
      <Weather />
    </main>
  );
};

export default DesktopApp;
