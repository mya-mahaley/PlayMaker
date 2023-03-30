import "../styles/Play.css";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import blank from "../images/blank_bg.jpg";
import football from "../images/football_bg.png";
import basketball from "../images/basketball_bg.jpg";
import baseball from "../images/baseball_bg.jpg";

function Play() {
  const [currentBackground, changeCurrentBackground] = useState(blank);
  
  return (
    <div>
      <Link to="/account">
        <Button variant="contained">Account</Button>
      </Link>
      <br />
      <Button
        variant="contained"
        onClick={() => changeCurrentBackground(football)}
      >
        Football
      </Button>
      <Button
        variant="contained"
        onClick={() => changeCurrentBackground(basketball)}
      >
        Basketball
      </Button>
      <Button
        variant="contained"
        onClick={() => changeCurrentBackground(baseball)}
      >
        Baseball
      </Button>
      <Button
        variant="contained"
        onClick={() => changeCurrentBackground(blank)}
      >
        Reset BG
      </Button>

      <div
        style={{ backgroundImage: `url(${currentBackground})` }}
        className="Canvas"
      ></div>
    </div>
  );
}

export default Play;
