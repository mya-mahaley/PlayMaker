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

export default function Account() {
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
              <Button variant="contained">Logout</Button>
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
              <Col className="AccountComponent">Play 1</Col>
              <Col className="AccountComponent">Play 2</Col>
              <Col className="AccountComponent">Play 3</Col>
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
