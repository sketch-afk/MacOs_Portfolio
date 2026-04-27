import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants";
import useWindowStore from "#store/window.js";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const { openWindow, closeWindow } = useWindowStore();

  const updateBatteryStatus = (battery) => {
    setBatteryLevel(Math.round(battery.level * 100));
    setIsCharging(battery.charging);
  };

  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator
        .getBattery()
        .then((battery) => {
          updateBatteryStatus(battery);

          battery.addEventListener("levelchange", () =>
            updateBatteryStatus(battery),
          );
          battery.addEventListener("chargingchange", () =>
            updateBatteryStatus(battery),
          );
        })
        .catch(() => {
          setBatteryLevel(100);
          setIsCharging(false);
        });
    }
  }, []);

  return (
    <nav id="control-toggle">
      <div>
        <img src="/images/logo.svg" alt="" />
        <p className="font-bold max-sm:hidden">Yash's Portfolio</p>

        <ul className="max-sm:hidden">
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          <span className="mr-1">{batteryLevel}%</span>
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
          {navIcons.map(({ id, img, type }) => (
            <li
              key={id}
              onClick={() => {
                if (isOpen) {
                  closeWindow(type);
                  setIsOpen(false);
                } else {
                  openWindow(type);
                  setIsOpen(true);
                }
              }}
            >
              <img
                src={img}
                className="icon-hover cursor-pointer"
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul>
        <time dateTime="">{dayjs().format("ddd, MMM, D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
