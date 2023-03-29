import "../styles/Account.css";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Account() {
  return (
    <div className="Account">
      <h1>This is the account page!</h1>

      <Grid container align="center" justifyContent="space-around" spacing={3}>
        <Grid item xs={4}>
          Search
        </Grid>
        <Grid item xs={4}>
          My Plays
        </Grid>
        <Grid item xs={4}>
          <Link to="/">
            <Button variant="contained">Logout</Button>
          </Link>
        </Grid>

        <Grid item xs={4}>
          PlayMaker
        </Grid>
        <Grid item xs={4}>
          Play Name
        </Grid>
        <Grid item xs={2}>
          Export
        </Grid>
        <Grid item xs={2}>
          Delete
        </Grid>
      </Grid>

      <Link to="/play">
        <Button variant="contained">Play</Button>
      </Link>
    </div>
  );
}
