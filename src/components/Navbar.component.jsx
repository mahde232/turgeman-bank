import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.style.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/"></Link>
      </div>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};
export default Navbar;
