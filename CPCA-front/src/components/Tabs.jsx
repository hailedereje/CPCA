import React, { useState } from "react";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";

export default function Tabs({ course }) {
  const [fillActive, setFillActive] = useState("tab1");

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }
    setFillActive(value);
  };

  return (
    <div className="mb-3">
      <TETabs fill>
        <TETabsItem
          onClick={() => handleFillClick("tab1")}
          active={fillActive === "tab1"}
        >
          Description
        </TETabsItem>
        <TETabsItem
          onClick={() => handleFillClick("tab2")}
          active={fillActive === "tab2"}
        >
          Objectives
        </TETabsItem>
        <TETabsItem
          onClick={() => handleFillClick("tab3")}
          active={fillActive === "tab3"}
        >
          Lessons
        </TETabsItem>
        <TETabsItem
          onClick={() => handleFillClick("tab4")}
          active={fillActive === "tab4"}
          //   disabled
        >
          Exercises
        </TETabsItem>
      </TETabs>

      <TETabsContent>
        <TETabsPane show={fillActive === "tab1"}>
          {course.description}
        </TETabsPane>
        <TETabsPane show={fillActive === "tab2"}>
          {course.objectives && course.objectives.map((objective, index) => (
            <ul>
              <li key={index}>{objective}</li>
            </ul>
          ))}
        </TETabsPane>
        <TETabsPane show={fillActive === "tab3"}>Tab 3 content</TETabsPane>
        <TETabsPane show={fillActive === "tab4"}>Tab 4 content</TETabsPane>
      </TETabsContent>
    </div>
  );
}
