import WindowWrapLaunch from "#hoc/WindowWrapLaunch";
import React, { useState, useEffect } from "react";
import useWindowStore from "#store/window.js";
import { launchpadApps } from "#constants";



const Launchpad = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApps, setFilteredApps] = useState(launchpadApps);
  const [isVisible, setIsVisible] = useState(false);

  const { windows, closeWindow, openWindow } = useWindowStore();
  const isOpen = windows["launchpad"]?.isOpen;


  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setSearchTerm(""); 
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = launchpadApps.filter((app) =>
      app.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApps(filtered);
  }, [searchTerm]);

  const handleAppClick = (app) => {
    if (app.canOpen && openWindow) {
      openWindow(app.id);
    }
    
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      closeWindow("launchpad");
    }, 300);
  };

  return (
    <div

      className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 flex flex-col items-center justify-center
        transition-all duration-300 ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-4xl px-8 py-12 transition-transform duration-300 
          ${isVisible ? "translate-y-0" : "translate-y-10"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="relative w-64 mx-auto mb-12">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white/20 backdrop-blur-md text-white border-0 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-8">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => handleAppClick(app)}
            >
              <div className="w-16 h-16 flex items-center justify-center mb-2 rounded-xl group-hover:bg-white/20 transition-colors">
                <img
                  src={app.icon || "https://via.placeholder.com/150"}
                  alt={app.title}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-white text-sm text-center">{app.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LaunchpadWindow = WindowWrapLaunch(Launchpad, "launchpad");
export default LaunchpadWindow;