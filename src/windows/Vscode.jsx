import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import React from 'react'

const Vscode = () => {
  return (
    <>
    <div id='window-header'>
             <WindowControls target= "vscode" />
             <h2>VS Code</h2>
        </div>
    <div className="vscode h-full w-full bg-gray-900 rounded-b-lg overflow-hidden">
      <iframe
        src="https://github1s.com/sketch-afk/MacOs_Portfolio/blob/main/README.md"
        className="w-full h-full border-0"
        title="VSCode Project View"
      />
    </div>
    </>
  )
}

const VscodeWindow = WindowWrapper(Vscode, "vscode");

export default VscodeWindow;
