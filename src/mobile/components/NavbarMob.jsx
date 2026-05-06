import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { navIcons } from "@constants";
import useWindowStoreMob from "@store/app";

const NavbarMob = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const { openWindow, closeWindow } = useWindowStoreMob();
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(dayjs());
  }, 1000);
  return () => clearInterval(timer);
}, []);

  const updateBatteryStatus = (battery) => {
    setBatteryLevel(Math.round(battery.level * 100));
    setIsCharging(battery.charging);
  };

  useEffect(() => {
    let battery = null;
    const handleChange = () => {
      if (battery) updateBatteryStatus(battery);
    };

    if ("getBattery" in navigator) {
      navigator
        .getBattery()
        .then((b) => {
          battery = b;
          updateBatteryStatus(battery);
          battery.addEventListener("levelchange", handleChange);
          battery.addEventListener("chargingchange", handleChange);
        })
        .catch(() => {
          setBatteryLevel(100);
          setIsCharging(false);
        });
    }

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleChange);
        battery.removeEventListener("chargingchange", handleChange);
      }
    };
  }, []);
  return (
    <nav className="mob-nav">
      <div>
        <img className="dark:invert" src="/images/logo.svg" alt="" />
        <p className="font-bold max-sm:hidden">Yash's Portfolio</p>
        <time dateTime={currentTime.toISOString()}>{currentTime.format("h:mm A")}</time>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img, type }) => (
            <li key={id}>
              <button
                type="button"
                className="icon-hover"
                onClick={() => {
                  if (isOpen) {
                    closeWindow(type);
                    setIsOpen(false);
                  } else {
                    openWindow(type);
                    setIsOpen(true);
                  }
                }}
                aria-pressed={isOpen}
              >
                <img src={img} alt={`icon-${id}`} />
              </button>
            </li>
          ))}
          <span className="text-sm">{batteryLevel}%</span>
          <div className="relative">
            <div className="w-6 h-3 border border-current rounded-sm relative">
              <div
                className="absolute top-0 left-0 bottom-0 bg-current"
                style={{ width: `${batteryLevel}%` }}
              ></div>
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-2 bg-current rounded-r-sm"></div>
              {isCharging && (
                <div className="absolute inset-0 flex items-center justify-center text-xs">
                  ⚡
                </div>
              )}
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarMob;
