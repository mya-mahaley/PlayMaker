import "../styles/Play.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState, useRef, useEffect } from "react";
import Notes from "./Notes.js";
import Form from "react-bootstrap/Form";
import { SketchPicker } from "react-color";
import blank from "../images/blank_bg.jpg";
import football from "../images/football_bg.png";
import basketball from "../images/basketball_bg.jpg";
import baseball from "../images/baseball_bg.jpg";
import { Link } from "react-router-dom";
import { useDrop } from "react-dnd";
import Icon from "./play/Icons";
import Template from "./play/Template";
import Draggable from "react-draggable";
import o_shape from "./play/o_shape.png";
import DraggableIcon from "./play/DraggableIcon";

// Drawing function from https://github.com/mikkuayu/React-Projects/blob/main/MyCanvas/my-canvas/src/components/DrawingCanvas/DrawingCanvas.js
// Color Picker Button from https://casesandberg.github.io/react-color/

function ColorButton({ value, onColorClick }) {
  const cStyle = {
    aspectRatio: 1,
    backgroundColor: value,
    borderColor: value,
  };
  if (value === "#ffffff") {
    cStyle.borderColor = "#F0F0F0";
  }
  return (
    <Button className="rounded-circle" onClick={onColorClick} style={cStyle}>
      &nbsp;&nbsp;
    </Button>
  );
}

function ColorPickButton({ value, onColorClick }) {
  const cStyle = {
    aspectRatio: 1,
    backgroundColor: value,
    borderColor: value,
  };
  if (value === "#FFFFFF") {
    cStyle.borderColor = "#F0F0F0";
  }
  return (
    <Button className="rounded-circle" onClick={onColorClick} style={cStyle}>
      +
    </Button>
  );
}

export default function Play() {
  const [showNotes, setShowNotes] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [title, setTitle] = useState("Play");
  const [color, setColor] = useState("Play");
  const [pickerColor, setPickerColor] = useState("#DD22BD");
  const [currentBackground, changeCurrentBackground] = useState(blank);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [canDraw, setCanDraw] = useState(false);

  const [template, setTemplate] = useState([]);

  const TEMPLATES = [
    { id: 1, name: "x" },
    { id: 2, name: "o" },
  ];

  const [{ isOver }, dropRef] = useDrop({
    accept: "icon",
    drop: (item) =>
      setTemplate((template) =>
        !template.includes(item) ? [...template, item] : template
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  function handleColorClick(value) {
    setColor(value);
    console.log(value);
  }

  function handlePickerChange(value) {
    setPickerColor(value);
  }

  function handlePickerClick() {
    setShowPicker(!showPicker);
  }

  function handlePickerClose() {
    setShowPicker(false);
  }

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    // Make it visually fill the positioned parent
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    // can only draw if selected, so we can drag shapes around on the screen
    if (canDraw) {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setIsDrawing(true);
      nativeEvent.preventDefault();
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    contextRef.current.strokeStyle = color;
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };

  return (
    <div>
      <Container>
        <Row className="headerBorder">
          <Col className="containerBorder" xs lg="3">
            <Link to="/account">
              <Button>Back</Button>
            </Link>
          </Col>
          <Col className="containerBorder">
            <Row className="align-items-center">
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    size="lg"
                    type="text"
                    rows={1}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    defaultValue={title}
                  />
                </Form.Group>
              </Form>
            </Row>
          </Col>
          <Col className="containerBorder" xs lg="2">
            <Row>User: Guest</Row>
            <Row>Saved: Not Saved</Row>
          </Col>
        </Row>
        <Row>
          <Col xs lg="3">
            <Row className="containerBorder">
              <h3>Shapes</h3>
              <Container>
                {TEMPLATES.map((template) => (
                  <div className="icon">
                    <Icon draggable id={template.id} name={template.name} />
                  </div>
                ))}

                <Button onClick={setToDraw}>Pen</Button>
                <Button onClick={setToErase}>Erase</Button>
                <Button onClick={() => setCanDraw(true)}>Can Draw</Button>
                <Button onClick={() => setCanDraw(false)}>Can't Draw</Button>
              </Container>
            </Row>
            <Row className="containerBorder">
              <h3>Colors</h3>
              <Container>
                <Row>
                  <Col>
                    <ColorButton
                      value={"#F64D4D"}
                      onColorClick={() => handleColorClick("#F64D4D")}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#F69E4D"}
                      onColorClick={() => handleColorClick("#F69E4D")}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#F6E54D"}
                      onColorClick={() => handleColorClick("#F6E54D")}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#97F64D"}
                      onColorClick={() => handleColorClick("#97F64D")}
                    ></ColorButton>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ColorButton
                      value={"#4D86F6"}
                      onColorClick={() => handleColorClick("#4D86F6")}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#000000"}
                      onColorClick={() => handleColorClick("#000000")}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#ffffff"}
                      onColorClick={() => handleColorClick("#ffffff")}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorPickButton
                      value={pickerColor}
                      onColorClick={() => handlePickerClick()}
                    ></ColorPickButton>
                  </Col>
                  {showPicker ? (
                    <div style={popover}>
                      <div style={cover} onClick={handlePickerClose} />
                      <SketchPicker
                        color={pickerColor}
                        onChange={(color) => handlePickerChange(color.hex)}
                        onChangeComplete={(color) =>
                          handleColorClick(color.hex)
                        }
                      />
                    </div>
                  ) : null}
                </Row>
              </Container>
            </Row>
            <Row className="containerBorder">
              <h3>Templates</h3>
              <Container>
                <Button onClick={() => changeCurrentBackground(football)}>
                  Football
                </Button>
                <Button onClick={() => changeCurrentBackground(basketball)}>
                  Basketball
                </Button>
                <Button onClick={() => changeCurrentBackground(baseball)}>
                  Baseball
                </Button>
                <Button onClick={() => changeCurrentBackground(blank)}>
                  Reset BG
                </Button>
              </Container>
            </Row>
            <Row className="containerBorder">
              <Button
                variant="primary"
                className="NotesButton"
                onClick={() => setShowNotes(true)}
              >
                Show Notes
              </Button>
              <Notes show={showNotes} onHide={() => setShowNotes(false)} />
            </Row>
          </Col>
          <Col className="containerBorder">
            <canvas
              // background image
              style={{ backgroundImage: `url(${currentBackground})` }}
              className="Canvas"
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            >
              <div ref={dropRef}>
                {template.map((icon) => (
                  <DraggableIcon id={icon.id} name={icon.name} />
                ))}
                {isOver}
                {/* <div>
                <Draggable bounds="parent">
                  <img className="icon" src={o_shape} alt="o shape" />
                </Draggable>
              </div> */}
              </div>
            </canvas>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
