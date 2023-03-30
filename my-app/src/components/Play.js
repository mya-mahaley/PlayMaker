import "../styles/Play.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Notes from "./Notes.js"
import Form from 'react-bootstrap/Form'
import { BlockPicker, SketchPicker } from 'react-color';
import { Link } from "react-router-dom";

function ColorButton({value, onColorClick}) {
  const cStyle={
    "aspectRatio": 1,
    "backgroundColor": value, 
    "borderColor": value 
    }
    if(value === "#ffffff"){
      cStyle.borderColor = "#F0F0F0"
    }
  return <Button className="rounded-circle" onClick={onColorClick} style={cStyle}>&nbsp;&nbsp;</Button>;
}

function ColorPickButton({value, onColorClick}) {
  const cStyle={
    "aspectRatio": 1,
    "backgroundColor": value, 
    "borderColor": value 
    }
    if(value === "#FFFFFF"){
      cStyle.borderColor = "#F0F0F0"
    }
  return <Button className="rounded-circle" onClick={onColorClick} style={cStyle}>+</Button>;
}

export default function Play() {
  const [showNotes, setShowNotes] = useState(false);
  const [showPicker, setShowPicker] = useState(false)
  const [title, setTitle] = useState("Play");
  const [color, setColor] = useState("Play");
  const [pickerColor, setPickerColor] = useState("#DD22BD");

  function handleColorClick(value){
    setColor(value)
    console.log(value)
  }

  function handlePickerChange(value){
    setPickerColor(value)
  }

  function handlePickerClick(){
    setShowPicker(!showPicker)
  };

  function handlePickerClose(){
    setShowPicker(false)
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  return (
    <div>    
      <Container >
        <Row className="headerBorder">
          <Col className="containerBorder" xs lg="3">
            <Link to="/account">
              <Button>Back</Button>
            </Link>
          </Col>
          <Col className="containerBorder">
            <Row className = "align-items-center">
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control size="lg" type="text"rows={1} onChange={(e) => {setTitle(e.target.value)}} defaultValue={title}/>
              </Form.Group>
            </Form>
            </Row>
          </Col>
          <Col className="containerBorder"  xs lg="2">
            <Row>User: Guest</Row> 
            <Row>Saved: Not Saved</Row>
          </Col>
        </Row>
        <Row>
          <Col xs lg="3">
            <Row className="containerBorder">
              <h3>Shapes</h3>
              
            </Row>
            <Row className="containerBorder">
              <h3>Colors</h3>
              <Container>
              <Row>
                <Col><ColorButton value={"#F64D4D"} onColorClick={() => handleColorClick("#F64D4D")}></ColorButton></Col>
                <Col><ColorButton value={"#F69E4D"} onColorClick={() => handleColorClick("#F69E4D")}></ColorButton></Col>
                <Col><ColorButton value={"#F6E54D"} onColorClick={() => handleColorClick("#F6E54D")}></ColorButton></Col>
                <Col><ColorButton value={"#97F64D"} onColorClick={() => handleColorClick("#97F64D")}></ColorButton></Col>
              </Row>
              <Row>
                <Col><ColorButton value={"#4D86F6"} onColorClick={() => handleColorClick("#4D86F6")}></ColorButton></Col>
                <Col><ColorButton value={"#000000"} onColorClick={() => handleColorClick("#000000")}></ColorButton></Col>
                <Col><ColorButton value={"#ffffff"} onColorClick={() => handleColorClick("#ffffff")}></ColorButton></Col>
                <Col><ColorPickButton value={pickerColor} onColorClick={() => handlePickerClick()}></ColorPickButton></Col>
                { showPicker ? <div style={ popover }>
                  <div style={ cover } onClick={ handlePickerClose }/>
                  <SketchPicker color={pickerColor} onChange={(color) => handlePickerChange(color.hex)} onChangeComplete={(color) => handleColorClick(color.hex)}/>
                  </div> : null }
              </Row>
              </Container>
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
