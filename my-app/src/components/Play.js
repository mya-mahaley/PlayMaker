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

// Drawing function from https://github.com/mikkuayu/React-Projects/blob/main/MyCanvas/my-canvas/src/components/DrawingCanvas/DrawingCanvas.js
// Color Picker Button from https://casesandberg.github.io/react-color/
// Able to drag stuff from https://jsfiddle.net/m1erickson/sEBAC

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
  const [color, setColor] = useState("#000000");
  const [pickerColor, setPickerColor] = useState("#DD22BD");
  const [currentBackground, changeCurrentBackground] = useState(blank);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [mouseDown, setMouseDown] = useState(false);
  // engage draw mode (true) or drag mode (false)
  const [canDraw, setCanDraw] = useState(true);

  // shapes array, keeps track of all shapes
  const [shapes, setShapes] = useState([]);

  // lines array, keeps track of all lines
  const [existingLines, setExistingLines] = useState([]);
  // initial line coords, keep track of beginning of line
  const [initialLineCoords, setInitialLineCoords] = useState([0, 0]);

  let lastX = 0;
  let lastY = 0;

  const addShape = (shape) => {
    let newShape = {
      x: 50,
      y: 50,
      fill: color,
      shape: shape,
    };
    let newShapes = shapes;
    newShapes.push(newShape);
    setShapes(newShapes);

    drawShape(newShape);
  };

  const drawShape = (shape) => {
    contextRef.current.beginPath();
    if (shape.shape === "O") {
      contextRef.current.arc(shape.x, shape.y, 20, 0, 2 * Math.PI);
    }
    contextRef.current.strokeStyle = shape.fill;
    contextRef.current.stroke();
  };

  const drawLine = (line) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(line.start_x, line.start_y);
    contextRef.current.lineTo(line.end_x, line.end_y);
    contextRef.current.strokeStyle = line.color;
    contextRef.current.stroke();
  };

  const drawAllShapes = () => {
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      drawShape(shape);
    }
  };

  const drawAllLines = () => {
    console.log(existingLines);
    for (let i = 0; i < existingLines.length; i++) {
      let line = existingLines[i];
      drawLine(line);
    }
  };

  const drawEverything = () => {
    const canvas = canvasRef.current;

    // erases the entire canvas
    // why? so we can infinitely redraw with new coords to simulate "dragging"
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    drawAllShapes();
    drawAllLines();
  };

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

  // sets up and grabs reference to canvas
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
    // can only draw if selected, so we can have separate drag mode
    const { offsetX, offsetY } = nativeEvent;
    nativeEvent.preventDefault();
    if (canDraw) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setInitialLineCoords([offsetX, offsetY]);
    }
    lastX = offsetX;
    lastY = offsetY;
    setMouseDown(true);
  };

  const draw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    nativeEvent.preventDefault();
    if (!canDraw && mouseDown) {
      // drag mode (mouse down and can't draw)
      // right now it is redrawing the shapes but is not dragging it
      for (let i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        drawShape(shape);
        if (contextRef.current.isPointInPath(lastX, lastY)) {
          shape.x += offsetX - lastX;
          shape.y += offsetY - lastY;
        }
      }
      for (let i = 0; i < existingLines.length; i++) {
        var line = existingLines[i];
        drawLine(line);
        if (contextRef.current.isPointInPath(lastX, lastY)) {
          line.start_x += offsetX - lastX;
          line.start_y += offsetY - lastY;
          line.end_x += offsetX - lastX;
          line.end_y += offsetY - lastY;
        }
      }

      lastX = offsetX;
      lastY = offsetY;
      drawEverything();
    } else if (canDraw && mouseDown) {
      // paint mode (mouse down and can draw)
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      contextRef.current.strokeStyle = color;
    } else {
      // else do nothing
      return;
    }
  };

  // stop drawing, so straighten out any lines and add it to existing lines
  const stopDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (canDraw && mouseDown) {
      let current_line = {
        start_x: initialLineCoords[0],
        start_y: initialLineCoords[1],
        end_x: offsetX,
        end_y: offsetY,
        color: color,
      };

      let newExistingLines = existingLines;
      newExistingLines.push(current_line);
      setExistingLines(newExistingLines);
      drawEverything();
    }
    contextRef.current.closePath();
    setMouseDown(false);
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
                {/* {TEMPLATES.map((template) => (
                  <div className="icon">
                    <Icon draggable id={template.id} name={template.name} />
                  </div>
                ))} */}
                <Button onClick={() => addShape("O")}>O</Button>
                <Button onClick={() => addShape("X")}>X</Button>

                <Button onClick={setToDraw}>Pen</Button>
                <Button onClick={setToErase}>Erase</Button>
                <Button onClick={() => setCanDraw(true)}>Draw Mode</Button>
                <Button onClick={() => setCanDraw(false)}>Drag Mode</Button>
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
            ></canvas>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
