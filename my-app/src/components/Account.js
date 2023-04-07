import "../styles/Account.css";
import logo from "../images/PlayMakerLogo.png";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./login/firebase";
import { signOut } from "firebase/auth";
import MyPlays from "./account/MyPlays"

const databaseURL = process.env.REACT_APP_DATABASE_URL
export default function Account() {
  const [playCount, setPlayCount] = useState(0);
  const [playList, setPlayList] = useState([]);
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPlay = async () => {
    const userID = auth.currentUser.uid
    getPlayCount()
    if (userID) {
      const data = {
        playCount: playCount + 1,
      };
      
      return fetch(`${databaseURL + "users/" + userID}.json`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status !== 200) {
          console.log("There was an error.");
        } else {
        }
      });
    }
    setPlayCount(playCount + 1)
  }

  const getPlayCount = async () => {
    const userID = auth.currentUser.uid
    if (userID) {
      fetch(`${databaseURL}users/${userID}.json`)
          .then((res) => {
            console.log("RES");
            console.log(res);
            if (res.status !== 200) {
              console.log("There was an error: " + res.statusText);
              return;
            } else {
              return res.json();
            }
          }).then((res) => {
            if (res) {
              setPlayCount(res.playCount); 
            } else {
             
            }
          });
    }
  }


  return (
    <div className="Account">
    <Container className="AccountScreen">
      <Row className="align-items-center">
        <Col xs lg="3">
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
          <Button variant="contained">Recently Deleted</Button>
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col xs lg="2">
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
          <Row>
            <Col className="AccountComponent">
              <Row><Button variant="contained">Folder</Button></Row>
              <Row><Button variant="contained">Folder</Button></Row>
              <Row><Button variant="contained">Folder</Button></Row>
              <Row><Button variant="contained">Folder</Button></Row>
              <Row><Button variant="contained">Folder</Button></Row>
              <Row><Button variant="contained">Folder</Button></Row>
              <Row><Button variant="contained">Folder</Button></Row>
            </Col>
          </Row>
        </Col>
        <Col className="AccountComponent" >
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
              <Button variant="contained" onClick={addPlay}>Create New Play</Button>
            </Link>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="AccountComponent" xs lg="3">
          <Row>
          <Col><h3 className="TextAlignment">PlayMaker</h3></Col>
          <Col><img src={logo} width={40} alt="PlayMaker logo"/></Col>
          </Row>
        </Col>
        <Col className="align-items-center">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  size="lg"
                  type="text"
                  rows={1}
                  onChange={(e) => {;
                  }}
                  defaultValue={"Selected Play"}
                />
              </Form.Group>
            </Form> </Col>
        <Col className="AccountComponent">
          <Button variant="contained">Export</Button>
          <Button variant="contained">Delete</Button>
        </Col>
      </Row>
    </Container>
  </div>
  );
}