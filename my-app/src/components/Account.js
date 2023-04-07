import "../styles/Account.css";
import logo from "../images/PlayMakerLogo.png";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./login/firebase";
import { signOut } from "firebase/auth";
import MyPlays from "./account/MyPlays"

export default function Account() {
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="Account">
      <Container className="AccountScreen">
        <Row className="align-items-center">
          <Col>
            <TextField
              id="outlined-basic"
              label="Search"
              fullWidth
              variant="outlined"
            />
          </Col>
          <Col className="AccountComponent">
            <h1>My Plays</h1>
          </Col>
          <Col className="AccountComponent">
            <Link to="/">
              <Button variant="contained" onClick={logOut}>Logout</Button>
            </Link>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col>
            <Row>
              <Col className="AccountComponent">
                <Button variant="contained">New Folder</Button>
              </Col>
            </Row>
            <Row>
              <Col className="AccountComponent">
                <Button variant="contained">All Sketches</Button>
              </Col>
            </Row>
          </Col>
          <Col className="AccountComponent">
            <Row>
              <center>
                <h4>
                  <b>Plays</b>
                </h4>
              </center>
            </Row>
            <Row>
              <MyPlays></MyPlays>
            </Row>
            <Row>
              <Link to="/play">
                <Button variant="contained">Create New Play</Button>
              </Link>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="AccountComponent">
            <h1>PlayMaker</h1>
            <img src={logo} width={50} alt="PlayMaker logo"/>
          </Col>
          <Col className="AccountComponent">Selected Play Name</Col>
          <Col className="AccountComponent">Export Delete</Col>
        </Row>
      </Container>
    </div>
  );
}