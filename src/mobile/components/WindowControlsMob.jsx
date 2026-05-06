import useWindowStoreMob from "@store/app.js";
import { ChevronLast, ChevronLeft, PanelLeft } from "lucide-react";
import React from "react";

const WindowControlsMob = ({
  target,
  closeWindow: closeWindowProp,
}) => {
  const windowStore = useWindowStoreMob();
  const closeWindow = closeWindowProp ?? windowStore.closeWindow;

  return (
    <div id="app-controls">
      <button
        type="button"
        className="cursor-pointer flex items-center"
        onClick={() => closeWindow(target)}
        aria-label="Go back"
      >
        <ChevronLeft className="icon" /> Go Back
      </button>
    </div>
  );
};

export default WindowControlsMob;
