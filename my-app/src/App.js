import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Account from "./components/Account";
import Play from "./components/Play";
import { useState, useEffect } from "react";
import { auth } from "./components/login/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true)
        navigate("/account");
        console.log("signed in");
      } else {
        // user is signed out
        console.log("not signed in");
        navigate("/")
        setSignedIn(false);
      }
    });
  }, [navigate, setSignedIn]);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route path="/play" element={<Play />} />
    </Routes>
  );
}
