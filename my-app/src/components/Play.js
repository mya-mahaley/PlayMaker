import "../styles/Play.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Notes from "./Notes.js"
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom";


export default function Play() {
  const [showNotes, setShowNotes] = useState(false);
  const [title, setTitle] = useState("Play");
  return (
    <div>    
      <Container >
        <Row className="headerBorder">
          <Col className="containerBorder" xs lg="3">Buttons</Col>
          <Col className="containerBorder" >
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control size="lg" type="text"rows={1} onChange={(e) => {setTitle(e.target.value)}} defaultValue={title}/>
              </Form.Group>
            </Form>
          </Col>
          <Col className="containerBorder"  xs lg="2">Status</Col>
        </Row>
        <Row>
          <Col xs lg="3">
            <Row className="containerBorder">
              <h3>Shapes</h3>
            </Row>
            <Row className="containerBorder">
              <h3>Colors</h3>
            </Row>
            <Row className="containerBorder">
              <h3>Templates</h3>
            </Row> 
            <Row className="containerBorder">
              <Button variant="primary" className="NotesButton" onClick={() => setShowNotes(true)}>
                Show Notes
              </Button>
              <Notes
                show={showNotes}
                onHide={() => setShowNotes(false)}
              />
            </Row>           
          </Col>
          <Col className="containerBorder">
            <h3>Canvas Column</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
