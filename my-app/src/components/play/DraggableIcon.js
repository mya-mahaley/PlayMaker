import React from "react";
import Draggable from "react-draggable";
import o_shape from "./o_shape.png"

function DraggableIcon({ id, name }) {

  return (
    <Draggable bounds="parent">
      <img className="icon"  src={o_shape} alt="o shape"/>
    </Draggable>
  );
}

export default DraggableIcon;
