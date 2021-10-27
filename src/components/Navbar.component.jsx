import React from "react";
import { Link } from "react-router-dom";
import Img from "../img/logo3.jpg";
import "./Navbar.style.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          {" "}
          <img src={Img} alt="bank logo" />
        </Link>
      </div>
      <div className="nav">
        <div className="linkDiv">
          <Link className="link" to="/">
            Home
          </Link>
        </div>
        <div className="linkDiv">
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
        <div className="linkDiv">
          <Link className="link" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
