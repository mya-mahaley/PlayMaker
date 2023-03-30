import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Draggable from "react-draggable";

function DraggableIcon({ id, name }) {
  return (
    <Draggable bounds="parent">
      <div className="icon">{name}</div>
    </Draggable>
  );
}

export default DraggableIcon;
