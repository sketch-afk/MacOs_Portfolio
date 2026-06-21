import React from "react";
import MobileWrapper from "@hoc/MobileWrapper.jsx";
import { techStack } from "@constants";
import { Check, Flag } from "lucide-react";
import { WindowControlsMob } from "@components";

const Terminalmob = () => {
  return (
    <div className="terminal-container">
      <div className="ios-app-header">
        <WindowControlsMob target="terminalmob" />
        <h2 className="header-title">Tech Stack</h2>
      </div>
      <div className="techstack">
        <p>
          <span className="font-bold">@yash % </span>
          show tech stack
        </p>
        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-start mb-2">
              <Check className="check shrink-0" size={20} />
              <h3 className="w-32 ms-2 shrink-0">{category}</h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
          </p>
          <p className="text-black dark:text-white mt-1">
            <Flag size={15} className="fill-black dark:fill-white mr-2" />
            Render time: 6ms
          </p>
        </div>
      </div>
    </div>
  );
};

const TerminalAppMob = MobileWrapper(Terminalmob, "terminalmob");

export default TerminalAppMob;
