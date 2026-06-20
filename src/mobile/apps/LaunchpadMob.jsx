import React, { useState, useEffect } from "react";
import useWindowStoreMob from "@store/app.js";
import { launchpadApps } from "@constants";
import MobileWrapLaunch from "../hoc/MobileWrapLaunch";

const LaunchpadMob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApps, setFilteredApps] = useState(launchpadApps);

  const { openApp, closeApp, activeApp } = useWindowStoreMob();

  // Reset search when opened
  useEffect(() => {
    if (activeApp === "launchpad") {
      setSearchTerm("");
    }
  }, [activeApp]);

  useEffect(() => {
    const filtered = launchpadApps.filter((app) =>
      app.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApps(filtered);
  }, [searchTerm]);

  const handleAppClick = (app) => {
    if (app.canOpen && openApp) {
      openApp(app.id);
    } else {
      closeApp(); // Close launchpad if app can't open
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center pt-20 pb-8 px-6 pointer-events-auto overflow-y-auto"
      onClick={(e) => {
        // Only close if clicking directly on the background/empty space
        if (e.target === e.currentTarget) {
          closeApp();
        }
      }}
    >
      {/* Search Bar */}
      <div className="relative w-full max-w-sm mx-auto mb-10 shrink-0">
        <input
          type="text"
          placeholder="App Library"
          className="w-full bg-white/50 dark:bg-black/30 backdrop-blur-xl text-gray-900 dark:text-white border border-gray-300 dark:border-white/10 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-md text-sm font-medium transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-4 gap-x-4 gap-y-8 w-full max-w-sm mx-auto">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="flex flex-col items-center justify-start cursor-pointer group active:opacity-70 transition-opacity"
            onClick={() => handleAppClick(app)}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-1.5 shadow-sm rounded-2xl overflow-hidden active:scale-95 transition-transform bg-white/10 dark:bg-white/5">
              <img
                src={app.icon || "https://via.placeholder.com/150"}
                alt={app.title}
                className="w-14 h-14 object-contain drop-shadow-lg"
              />
            </div>
            <span className="text-gray-900 dark:text-white text-[11px] font-medium text-center line-clamp-1 px-1 drop-shadow-sm">
              {app.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LaunchpadWindowMob = MobileWrapLaunch(LaunchpadMob, "launchpad");
export default LaunchpadWindowMob;