import useWindowStoreMob from "@store/app.js";
import { ChevronLeft } from "lucide-react";
import React from "react";

const WindowControlsMob = ({
  closeApp: closeAppProp,
}) => {
  const windowStore = useWindowStoreMob();
  const closeApp = closeAppProp ?? windowStore.closeApp;

  return (
    <div id="app-controls ">
      <button
        type="button"
        className="cursor-pointer flex items-center justify-center whitespace-nowrap"
        onClick={() => closeApp()}
        aria-label="Go back"
      >
        <ChevronLeft className="iconmob cursor-pointer mt-0.5" /> Go Back
      </button>
    </div>
  );
};

export default WindowControlsMob;
