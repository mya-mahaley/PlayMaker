import { BrowserRouter as HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Account from "./components/Account";
import Play from "./components/Play";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </HashRouter>
  );
}
