import React from "react";
import { Terminalmob, ControlMob, LaunchpadMob, WeatherMob } from "@apps";
import { DockMob, NavbarMob, WelcomeMob } from "@components";


const MobileApp = () => {
  return (
    <>
      <NavbarMob />
      <WelcomeMob />
      <DockMob />
      <Terminalmob />
      <ControlMob />
      <LaunchpadMob />
      <WeatherMob />
    </>
  );
};

export default MobileApp;
