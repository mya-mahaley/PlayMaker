import React from "react";
import { Link } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Icon from "./play/Icons";
import Template from "./play/Template";

function Play() {
  const [field1, setField1] = React.useState("");
  React.useEffect(() => {
    console.log(field1);
  }, [field1]);
  return (
    <div>
      This is the play page!
      <DndProvider backend={HTML5Backend}>
        <Template> ww</Template>
      </DndProvider>
      <br />
      <Link to="/account">
        <button variant="contained">Account</button>
      </Link>
    </div>
  );
}

export default Play;
