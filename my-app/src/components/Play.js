import React from "react";
import { Link } from "react-router-dom";

export default function Play() {
  return (
    <div>
      This is the play page!
      <br />
      <Link to="/account">
        <button variant="contained">Account</button>
      </Link>
    </div>
  );
}
