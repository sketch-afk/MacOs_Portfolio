import React from "react";
import MobileWrapper from "@hoc/MobileWrapper.jsx";
import { techStack } from "@constants";
import { Check, Flag } from "lucide-react";
import {WindowControlsMob} from "@components";

const Terminalmob = () => {
  return (
    <>
      <div className="app-header">
        <WindowControlsMob target="terminal" />
        <h2>Tech Stack</h2>
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
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
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
          <p className="text-black dark:text-white">
            <Flag size={15} className="fill-black dark:fill-white" />
            Render time: 6ms
          </p>
        </div>{" "}
      </div>
    </>
  );
};

const TerminalWindowMob = MobileWrapper(Terminalmob, "terminal");

export default TerminalWindowMob;
