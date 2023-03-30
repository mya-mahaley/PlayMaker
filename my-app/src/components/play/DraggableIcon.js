import React from "react";
import Draggable from "react-draggable";

function DraggableIcon({ id, name }) {

  return (
    <Draggable bounds="parent">
      <div className="icon">{name}</div>
    </Draggable>
  );
}

export default DraggableIcon;
