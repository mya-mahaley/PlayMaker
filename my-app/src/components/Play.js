import React from "react";
import { Link } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Icon from "./play/Icons";
import Template from "./play/Template";

function Play() {
  const TEMPLATES = [
    { id: 1, name: "x" },
    { id: 2, name: "o" },
  ];
  
  return (
    <div>
      This is the play page!
      <DndProvider backend={HTML5Backend}>
        <div className="icons">
          <h1>Icons</h1>
          <br></br>

          {TEMPLATES.map((template) => (
            <div className="icon">
              <Icon draggable id={template.id} name={template.name} />
            </div>
          ))}
        </div>

        <Template> </Template>
      </DndProvider>
      <br />
      <Link to="/account">
        <button variant="contained">Account</button>
      </Link>
    </div>
  );
}

export default Play;
