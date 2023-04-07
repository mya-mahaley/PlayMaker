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
import { cyan } from "@mui/material/colors";
import { auth } from "./login/firebase";

// Drawing function from https://github.com/mikkuayu/React-Projects/blob/main/MyCanvas/my-canvas/src/components/DrawingCanvas/DrawingCanvas.js
// Color Picker Button from https://casesandberg.github.io/react-color/
// Able to drag stuff from https://jsfiddle.net/m1erickson/sEBAC
// Draggable lines from https://stackoverflow.com/questions/5559248/how-to-create-a-draggable-line-in-html5-canvas
// Erasing lines from https://stackoverflow.com/questions/29692134/how-to-delete-only-a-line-from-the-canvas-not-all-the-drawings
// Undo/Redo from https://medium.com/geekculture/react-hook-to-allow-undo-redo-d9d791c5cd94

const databaseURL = process.env.REACT_APP_DATABASE_URL
function ColorButton({ value, onColorClick, selectedColor}) {
  const cStyle = {
    aspectRatio: 1,
    backgroundColor: value,
    border: "3px solid",
    borderColor: value,
  };
  if (value === "#ffffff") {
    cStyle.borderColor = "#F0F0F0";
  }

  if (selectedColor === value) {
    cStyle.borderColor = "#7DF9FF";
  }

  return (
    <Button className="rounded-circle" 
      onClick={onColorClick} 
      style={cStyle}>
      &nbsp;&nbsp;
    </Button>
  );
}

function ColorPickButton({ value, onColorClick, selectedColor}) {
  const cStyle = {
    aspectRatio: 1,
    backgroundColor: value,
    border: "3px solid",
    borderColor: value,
  };
  if (value === "#FFFFFF") {
    cStyle.borderColor = "#F0F0F0";
  } 
  if (selectedColor === value) {
    cStyle.borderColor = "#7DF9FF";
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
  //const userID = auth.currentUser.uid;

  const [mouseDown, setMouseDown] = useState(false);
  // engage draw mode, drag mode, erase mode
  const [canDraw, setCanDraw] = useState(true);
  const [canDrag, setCanDrag] = useState(false);
  const [eraseMode, setEraseMode] = useState(false);

  // drawings array, contains shapes and lines
  const [drawings, setDrawings] = useState([]);
  const [nearestDrawing, setNearestDrawing] = useState(-1);

  // initial line coords, keep track of beginning of line
  const [initialLineCoords, setInitialLineCoords] = useState([0, 0]);

  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  // undo/redo stuff
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canvasStates, setCanvasStates] = useState([[]]);

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


  const sendData = () => {
    /*if (userID) {
      fetch(`${databaseURL}/users/${userId}/${title}.json`)
        .then((res) => {
          if (res.status !== 200) {
            console.log("Error retrieving list: " + res.statusText);
          } else {
            return res.json();
          }
        })
        .then((res) => {
          if (res) {
            // add item into list
            updateNoteData(res);
          } else {
            // empty list, must create a new array to put it in
            addNoteData();
          }
        });*/
  }

    /*const updateNoteData = (currentDrawings) => {
      if (userID) {
        const data = {
          drawings: currentDrawings,
        };
        return fetch(`${databaseURL}/users/${userID}/.json`, {
          method: "PATCH",
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.status !== 200) {
            console.log("Error updating currentList.");
          } else {
            // re-update the current list on the screen
            getData(userName);
          }
        });
      }
    };
  
    const addNoteData = () => {
      if (userID) {
        const data = {
          drawings: currentDrawings,
        };
        return fetch(`${databaseURL}/users/${userID}/.json`, {
          method: "PUT",
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.status !== 200) {
            console.log("There was an error.");
          } else {
            // display current list on screen
            getNoteData(userName);
          }
        });
      }
    };
  
    const getNoteData = async (userName) => {
      if (userID) {
        console.log(userName);
        fetch(`${databaseURL}/users/${userName}/shopping_list.json`)
          .then((res) => {
            console.log(`${databaseURL}/users/${userName}/shopping_list.json`);
            console.log(res);
            if (res.status !== 200) {
              console.log("There was an error: " + res.statusText);
              // throw new Error(res.statusText);
              return;
            } else {
              console.log("Successfully retrieved the data");
              return res.json();
            }
          })
          .then((res) => {
            if (res) {
              console.log(res);
              setGroceryList(res);
            } else {
              // no shopping list, add some items!
              setGroceryList(null);
            }
            // clear textbox for item
            setNewItem("");
          });
      }
    };*/

  const addDrawing = (drawing) => {
    setDrawings((drawings) => [...drawings, drawing]);
    let newDrawings = drawings;
    addCanvasState([...newDrawings, drawing]);
  };

  const addShape = (shapeType) => {
    let newShape = {
      type: "shape",
      x: 50,
      y: 50,
      color: color,
      shape: shapeType,
    };

    addDrawing(newShape);
    drawShape(newShape);
  };

  const drawShape = (shape) => {
    contextRef.current.strokeStyle = shape.color;
    contextRef.current.beginPath();
    if (shape.shape === "O") {
      contextRef.current.arc(shape.x, shape.y, 20, 0, 2 * Math.PI);
    } else {
      contextRef.current.beginPath();
      contextRef.current.moveTo(shape.x - 20, shape.y - 20);
      contextRef.current.lineTo(shape.x + 20, shape.y + 20);
      contextRef.current.stroke();
      contextRef.current.closePath();

      contextRef.current.beginPath();
      contextRef.current.moveTo(shape.x - 20, shape.y + 20);
      contextRef.current.lineTo(shape.x + 20, shape.y - 20);
    }
    contextRef.current.stroke();
  };

  const drawLine = (line) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(line.startX, line.startY);
    contextRef.current.lineTo(line.endX, line.endY);
    contextRef.current.strokeStyle = line.color;
    contextRef.current.stroke();
  };

  const addCanvasState = (currentDrawing) => {
    // remove all future (redo) states
    let canvasState = [
      ...canvasStates.slice(0, currentIndex + 1),
      currentDrawing,
    ];
    setCanvasStates(canvasState);
    setCurrentIndex(canvasState.length - 1);
  };

  const undoAction = () => {
    let newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    setDrawings(canvasStates[newIndex]);
  };

  const redoAction = () => {
    let newIndex = Math.min(canvasStates.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    setDrawings(canvasStates[newIndex]);
  };

  // draws all the shapes on the canvas, updates when array of objects get updated
  useEffect(() => {
    const canvas = canvasRef.current;
    // console.log("erasing canvas!");
    // console.log(drawings);

    // erases the entire canvas
    // why? so we can infinitely redraw with new coords to simulate "dragging"
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drawings.length; i++) {
      let currentDrawing = drawings[i];
      if (currentDrawing.type === "shape") {
        drawShape(currentDrawing);
      } else {
        drawLine(currentDrawing);
      }
    }
  }, [drawings]);

  // linear interpolation, needed to calculate closest distance for lines
  const lerp = (a, b, x) => {
    return a + x * (b - a);
  };

  // canvas doesn't recognize lines, just pixels so we have to manually find it ourselves
  // much easier interactivity to have nearest drawing instead of precisely clicking/dragging
  // the actual shape
  const findNearestDrawing = (mouseX, mouseY) => {
    let closestIndex = -1;
    let minDistance = 1000000;

    for (let i = 0; i < drawings.length; i++) {
      let currentDrawing = drawings[i];
      let closestX = 0,
        closestY = 0,
        distanceX = 0,
        distanceY = 0;
      if (currentDrawing.type === "shape") {
        // shape only has to worry about center, not necessarily border
        closestX = currentDrawing.x;
        closestY = currentDrawing.y;
      } else {
        distanceX = currentDrawing.endX - currentDrawing.startX;
        distanceY = currentDrawing.endY - currentDrawing.startY;
        let t =
          ((mouseX - currentDrawing.startX) * distanceX +
            (mouseY - currentDrawing.startY) * distanceY) /
          (distanceX * distanceX + distanceY * distanceY);
        t = Math.max(0, Math.min(1, t)); // not sure if this line is needed
        closestX = lerp(currentDrawing.startX, currentDrawing.endX, t);
        closestY = lerp(currentDrawing.startY, currentDrawing.endY, t);
      }
      distanceX = mouseX - closestX;
      distanceY = mouseY - closestY;
      let distance = distanceX * distanceX + distanceY * distanceY;
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    setNearestDrawing(closestIndex);
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

  // onMouseDown
  const startDrawing = ({ nativeEvent }) => {
    // can only draw if selected, so we can have separate drag mode
    const { offsetX, offsetY } = nativeEvent;
    nativeEvent.preventDefault();
    findNearestDrawing(offsetX, offsetY);
    if (eraseMode) {
      // erase mode, delete the nearest drawing and redraw
      if (nearestDrawing !== -1) {
        let newDrawings = [
          ...drawings.slice(0, nearestDrawing),
          ...drawings.slice(nearestDrawing + 1, drawings.length),
        ];
        setDrawings(newDrawings);
        addCanvasState(newDrawings);
      }
    } else if (canDraw) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setInitialLineCoords([offsetX, offsetY]);
    } else {
      // drag mode
      setLastX(offsetX);
      setLastY(offsetY);
    }
    setMouseDown(true);
  };

  // onMouseMove
  const draw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    nativeEvent.preventDefault();
    if (eraseMode) {
      // why? because it's not updating fast enough apparently
      findNearestDrawing(offsetX, offsetY);
      return;
    }
    if (canDrag && mouseDown) {
      // drag mode (mouse down and can't draw)
      // find nearest drawing and it will be dragged
      if (nearestDrawing !== -1) {
        let draggedDrawing = drawings[nearestDrawing];
        if (draggedDrawing.type === "shape") {
          draggedDrawing.x += offsetX - lastX;
          draggedDrawing.y += offsetY - lastY;
        } else {
          draggedDrawing.startX += offsetX - lastX;
          draggedDrawing.startY += offsetY - lastY;
          draggedDrawing.endX += offsetX - lastX;
          draggedDrawing.endY += offsetY - lastY;
        }

        let newDrawings = [...drawings];
        newDrawings[nearestDrawing] = draggedDrawing;
        setDrawings(newDrawings);
        setLastX(offsetX);
        setLastY(offsetY);
        // drawEverything(drawings);
      }
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

  // onMouseUp, onMouseLeave
  // stop drawing, so straighten out any lines and add it to existing lines
  const stopDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.closePath();
    if (eraseMode) {
      setMouseDown(false);
      return;
    }
    if (canDraw && mouseDown) {
      let currentLine = {
        type: "line",
        startX: initialLineCoords[0],
        startY: initialLineCoords[1],
        endX: offsetX,
        endY: offsetY,
        color: color,
      };

      addDrawing(currentLine);
    }
    if (canDrag && mouseDown) {
      // enable undo/redo for dragging
      let newDrawing = drawings;
      addCanvasState(newDrawing);
      console.log(canvasStates);
    }
    setMouseDown(false);
    findNearestDrawing(offsetX, offsetY);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
  };

  const toggleMode = (mode) => {
    setEraseMode(false);
    setCanDraw(false);
    setCanDrag(false);
    if (mode === 1) {
      setEraseMode(true);
    } else if (mode === 2) {
      setCanDraw(true);
    } else {
      setCanDrag(true);
    }
  };

  return (
    <div>
      <Container>
        <Row className="headerBorder">
          <Col className="containerBorder" xs lg="3">
            <Link to="/account">
              <Button>Back</Button>
            </Link>
            <Button onClick={() => undoAction()}>Undo</Button>
            <Button onClick={() => redoAction()}>Redo</Button>
            <Button onClick={() => sendData()}>Save</Button>
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
                <Button onClick={() => addShape("O")}>O</Button>
                <Button onClick={() => addShape("X")}>X</Button>

                {/* <Button onClick={setToDraw}>Pen</Button> */}
                <Button onClick={() => toggleMode(1)}>Erase Mode</Button>
                <Button onClick={() => toggleMode(2)}>Draw Mode</Button>
                <Button onClick={() => toggleMode(3)}>Drag Mode</Button>
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
                      selectedColor={color}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#F69E4D"}
                      onColorClick={() => handleColorClick("#F69E4D")}
                      selectedColor={color}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#F6E54D"}
                      onColorClick={() => handleColorClick("#F6E54D")}
                      selectedColor={color}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#97F64D"}
                      onColorClick={() => handleColorClick("#97F64D")}
                      selectedColor={color}
                    ></ColorButton>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ColorButton
                      value={"#4D86F6"}
                      onColorClick={() => handleColorClick("#4D86F6")}
                      selectedColor={color}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#000000"}
                      onColorClick={() => handleColorClick("#000000")}
                      selectedColor={color}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorButton
                      value={"#ffffff"}
                      onColorClick={() => handleColorClick("#ffffff")}
                      selectedColor={color}
                    ></ColorButton>
                  </Col>
                  <Col>
                    <ColorPickButton
                      value={pickerColor}
                      onColorClick={() => handlePickerClick()}
                      selectedColor={color}
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
