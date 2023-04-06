import "../styles/Login.css";
import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";
import { useState, useEffect } from "react";
import { auth } from "./login/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/account");
        console.log("signed in");
      } else {
        console.log("not signed in");
        navigate("/");
      }
    });
  }, [navigate]);

  function onGuestClick() {
    signInWithEmailAndPassword(auth, "guest@gmail.com", "123456")
      .then((userCredential) => {
        // signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="Login">
      <h1>PlayMaker</h1>

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
        <Button variant="contained" onClick={onGuestClick}>Guest</Button>
      </Link>
    </div>
  );
}
