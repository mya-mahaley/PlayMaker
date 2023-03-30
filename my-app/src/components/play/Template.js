import React from "react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import Draggable from "react-draggable";
import DraggableIcon from "./DraggableIcon";
import "./TemplateStyle.css";

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
    <div className="field" ref={dropRef}>
      Drag and Drop the icons above here
      {template.map((icon) => (
        <DraggableIcon id={icon.id} name={icon.name} />
      ))}
      {isOver}
      
      <Draggable bounds="parent">
        <div className="icon">X</div>
      </Draggable>
    </div>
  );
}

export default Template;
