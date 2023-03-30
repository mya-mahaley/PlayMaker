import "../styles/Account.css";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Account() {
  return (
    <div className="Account">
      <Container className="AccountScreen">
        <Row className="align-items-center">
          <Col className="AccountComponent">Search</Col>
          <Col className="AccountComponent">My Plays</Col>
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
              <Col className="AccountComponent">All Sketches</Col>
            </Row>
          </Col>
          <Col className="AccountComponent">
            <Row>
              <center>Plays</center>
            </Row>
            <Row>
              <Link to="/play">
                <Button variant="contained">Create New Play</Button>
              </Link>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="AccountComponent">PlayMaker</Col>
          <Col className="AccountComponent">Play Name</Col>
          <Col className="AccountComponent">Export Delete</Col>
        </Row>
      </Container>
    </div>
  );
}
