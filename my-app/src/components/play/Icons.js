import React from "react";
import { useDrag } from "react-dnd";

function Icon({ id, name }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "icon",
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  return (
    <div className="icon" ref={dragRef}>
      {name}
    </div>
  );
}

export default Icon;
