import "../styles/Play.css";
import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import blank from "../images/blank_bg.jpg";
import football from "../images/football_bg.png";
import basketball from "../images/basketball_bg.jpg";
import baseball from "../images/baseball_bg.jpg";

// Drawing function from https://github.com/mikkuayu/React-Projects/blob/main/MyCanvas/my-canvas/src/components/DrawingCanvas/DrawingCanvas.js

function Play() {
  const [currentBackground, changeCurrentBackground] = useState(blank);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [canDraw, setCanDraw] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;

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
      <div>
        <Button variant="contained" onClick={setToDraw}>
          Draw
        </Button>
        <Button variant="contained" onClick={setToErase}>
          Erase
        </Button>
        <Button variant="contained" onClick={() => setCanDraw(true)}>
          Draw
        </Button>
        <Button variant="contained" onClick={() => setCanDraw(false)}>
          Don't Draw
        </Button>
      </div>
    </div>
  );
}

export default Play;
