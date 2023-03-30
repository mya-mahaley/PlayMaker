import React from "react";
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import Icon from "./Icons";
import "./TemplateStyle.css";

const TEMPLATES = [
  { id: 1, name: "x" },
  { id: 2, name: "o" },
];

function Template() {
  const [template, setTemplate] = useState([]);
  const [{ isOver }, dropRef] = useDrop({
    accept: "icon",
    drop: (item) =>
      setTemplate((template) =>
        !template.includes(item) ? [...template, item] : template
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div>
      <div className="icons">
        {TEMPLATES.map((template) => (
          <Icon draggable id={template.id} name={template.name} />
        ))}
      </div>

      <div className="field" ref={dropRef}>
        Drag and Drop the icons above here
        {template.map((icon) => (
          <Icon id={icon.id} name={icon.name} />
        ))}
        {isOver}
      </div>
    </div>
  );
}

export default Template;
