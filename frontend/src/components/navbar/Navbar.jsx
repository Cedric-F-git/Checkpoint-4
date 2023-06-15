import { Link } from "react-router-dom";
import React from "react";
import Logout from "../login/Logout";

function Navbar() {
  return (
    <nav className="navbar-container">
      <Link to="/">Profil</Link>
      <Logout />
    </nav>
  );
}

export default Navbar;
