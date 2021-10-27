import React from "react";
import { Link } from "react-router-dom";
import Img from "../img/logo2.jpg";
import "./Navbar.style.css";
const Navbar = ({whoIsLoggedIn,logoutCallback}) => {

  const handleLogout = () => {
    console.log('logout btn clicked');
    logoutCallback();
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          {" "}
          <img src={Img} alt="bank logo" />
        </Link>
      </div>
      <div className="nav">
        {
          whoIsLoggedIn ?
          (<>
          {console.log(whoIsLoggedIn)}
            <div style={{color: "white"}}>Hello {whoIsLoggedIn.firstName}</div>
            <div className="linkDiv" onClick={handleLogout}>Logout</div>
          </>)
          : (<>
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
          </>)
        }
      </div>
    </div>
  );
};
export default Navbar;
