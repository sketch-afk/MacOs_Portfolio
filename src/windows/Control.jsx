import React, { useState, useEffect, useRef } from "react";
import WindowWrapControl from "#hoc/WindowWrapControl";
import useWindowStore from "#store/window.js";
import { Wifi, Bluetooth, Moon, Sun, Volume2, VolumeX, Maximize } from "lucide-react";

const Control = ({ isDarkMode, onToggleDarkMode }) => {
  const { windows, closeWindow } = useWindowStore();
  const isOpen = windows["control"]?.isOpen;
  
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const controlRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {

      if (controlRef.current && !controlRef.current.contains(event.target)) {
        
        if (!event.target.closest("#control-toggle")) {
          closeWindow("control");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeWindow]);

  useEffect(() => {
    const savedWifi = localStorage.getItem("wifiEnabled");
    if (savedWifi !== null) setWifiEnabled(savedWifi === "true");

    const savedBrightness = localStorage.getItem("displayBrightness");
    if (savedBrightness !== null) setBrightness(Number(savedBrightness));

    setIsFullscreen(!!document.fullscreenElement);
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);


  useEffect(() => {
    let overlay = document.getElementById("brightness-overlay");
    
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "brightness-overlay";
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.pointerEvents = "none";
      overlay.style.zIndex = "99999"; 
      overlay.style.transition = "background-color 0.1s ease-out";
      document.body.appendChild(overlay);
    }

    const darknessFactor = 1 - (brightness / 100);
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${darknessFactor})`;
    

    localStorage.setItem("displayBrightness", brightness.toString());


  }, [brightness]);

  const toggleWifi = () => {
    const newState = !wifiEnabled;
    setWifiEnabled(newState);
    localStorage.setItem("wifiEnabled", newState.toString());
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={controlRef}
      className="w-80 bg-gray-800/80 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-white/10"
    >
      <div className="p-4">
        {/* Toggle Buttons Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <button
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${
              wifiEnabled ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={toggleWifi}
          >
            <Wifi className="w-6 h-6 text-white mb-1" />
            <span className="text-white text-[9px] uppercase font-medium">Wi-Fi</span>
          </button>

          <button
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${
              bluetoothEnabled ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
          >
            <Bluetooth className="w-6 h-6 text-white mb-1" />
            <span className="text-white text-[9px] uppercase font-medium">Bluetooth</span>
          </button>

          <button
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${
              isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-500"
            }`}
            onClick={onToggleDarkMode}
          >
            {isDarkMode ? <Moon className="w-6 h-6 text-white mb-1" /> : <Sun className="w-6 h-6 text-white mb-1" />}
            <span className="text-white text-[9px] uppercase font-medium">{isDarkMode ? "Dark" : "Light"}</span>
          </button>

          <button
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${
              isFullscreen ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={toggleFullscreen}
          >
            <Maximize className="w-6 h-6 text-white mb-1" />
            <span className="text-white text-[9px] uppercase font-medium">{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>

        {/* Brightness Slider */}
        <div className="bg-gray-700 rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-medium">Display</span>
            <span className="text-white/70 text-xs">{brightness}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number.parseInt(e.target.value))}
            className="w-full h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Volume Slider */}
        <div className="bg-gray-700 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-medium">Volume</span>
            <span className="text-white/70 text-xs">{volume}%</span>
          </div>
          <div className="flex items-center">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4 text-white/70 mr-2" />
            ) : (
              <Volume2 className="w-4 h-4 text-white/70 mr-2" />
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number.parseInt(e.target.value))}
              className="flex-1 h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const controlWindow = WindowWrapControl(Control, "control");
export default controlWindow;