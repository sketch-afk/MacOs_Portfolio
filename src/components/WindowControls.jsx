import React from "react";
import useWindowStore from "#store/window.js";

const WindowControls = ({
  target,
  minimizeWindow,
  maximizeWindow,
  closeWindow: closeWindowProp,
}) => {
  const windowStore = useWindowStore();
  const closeWindow = closeWindowProp ?? windowStore.closeWindow;
  const handleMinimize = minimizeWindow ?? windowStore.minimizeWindow ?? closeWindow;
  const handleMaximize = maximizeWindow ?? windowStore.maximizeWindow ?? closeWindow;

  return (
    <div id="window-controls">
      <div className="close cursor-pointer" onClick={() => closeWindow(target)} />
      <div
        className="minimize cursor-pointer"
        onClick={() => handleMinimize(target)}
      />
      <div
        className="maximize cursor-pointer"
        onClick={() => handleMaximize(target)}
      />
    </div>
  );
};

export default WindowControls;
