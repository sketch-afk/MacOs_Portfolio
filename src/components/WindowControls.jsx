import React from "react";
import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div
        className="minimize cursor-pointer"
        onClick={() => closeWindow(target)}
      />
      <div
        className="maximize cursor-pointer"
        onClick={() => closeWindow(target)}
      />
    </div>
  );
};

export default WindowControls;
