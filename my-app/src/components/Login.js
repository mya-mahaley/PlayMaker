import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      This is the login page!
      <br />
      <Link to="/account">
        <button variant="contained">Account</button>
      </Link>
    </div>
  );
}
