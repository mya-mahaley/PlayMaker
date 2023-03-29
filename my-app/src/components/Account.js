import "../styles/Account.css";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Account() {
  return (
    <div className="Account">
      <h1>This is the account page!</h1>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="row" justifyContent="center" alignItems="center">
        <Grid item className="AccountComponent" xs={3}>
          Search
        </Grid>
        <Grid item className="AccountComponent" xs={3}>
          My Plays
        </Grid>
        <Grid item className="AccountComponent" xs={3}>
          <Link to="/">
            <Button variant="contained">Logout</Button>
          </Link>
        </Grid>
        <Box width="100%"></Box>

        <Grid item className="AccountComponent" xs={3}>
          PlayMaker
        </Grid>
        <Grid item className="AccountComponent" xs={3}>
          Play Name
        </Grid>
        <Grid item className="AccountComponent" xs={1.5}>
          Export
        </Grid>
        <Grid item className="AccountComponent" xs={1.5}>
          Delete
        </Grid>
        <Box width="100%"></Box>
      </Grid>

      <Link to="/play">
        <Button variant="contained">Play</Button>
      </Link>
    </div>
  );
}
