import React from "react";
import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div>
      This is the account page!
      <br />
      <Link to="/">
        <button variant="contained">Login</button>
      </Link>
      <br />
      <Link to="/play">
        <button variant="contained">Play</button>
      </Link>
    </div>
  );
}
