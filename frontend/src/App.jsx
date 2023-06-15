import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./style/index.scss";
import "./App.css";

import Character from "./pages/Character";
import Group from "./pages/Group";
import Home from "./pages/Home";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import UserProvider from "./contexts/UserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <UserProvider>
        {loggedIn ? (
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/character/:id" element={<Character />} />
              <Route path="/group/:id" element={<Group />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </UserProvider>
    </div>
  );
}

export default App;
