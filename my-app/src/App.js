import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Account from "./components/Account";
import Play from "./components/Play";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/play" element={<DndProvider backend={HTML5Backend}><Play /></DndProvider>} />
      </Routes>
    </Router>
  );
}
