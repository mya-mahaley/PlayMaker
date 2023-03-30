import "../styles/Login.css";
import logo from "../images/PlayMakerLogo.png";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";

export default function Login() {
  return (
    <div className="Login">
      <h1>PlayMaker</h1>
      <img src={logo} width={50} alt="PlayMaker logo"/>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SignIn />
        </Grid>
        <Grid item xs={6}>
          <SignUp />
        </Grid>
      </Grid>

      <br />
      <Link to="/account">
        <Button variant="contained">Guest</Button>
      </Link>
    </div>
  );
}
