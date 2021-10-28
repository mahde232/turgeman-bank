import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import Img from "../img/logo3.jpg";
import "./Navbar.style.css";
// import song from '../audio/turgubank.mpeg'
const Navbar = ({logoutCallback, loggedInUser}) => {

  const handleLogout = () => {
    logoutCallback();
  }
  // useEffect(() => {
  //   document.getElementById("song").play();
  // },[])

  return (
    <div className="navbar">
      {/* <audio id='song' no-controls>
      <source src={song} type="audio/mpeg"/>
      </audio> */}
      <div className="logo">
        <Link to="/">
          <img src={Img} alt="bank logo" />
        </Link>
      </div>
      <div className="nav">
        {loggedInUser ? (
          <>
            <div style={{ color: "white", marginRight:'10px'}}>Hello {loggedInUser.firstName}</div>
            <Link className="link" to="/transactions">
            <div className="linkDiv">
                My Transactions
            </div>
            </Link>
            <Link className="link" to="/addTransaction">
            <div className="linkDiv">
                Add Transaction
            </div>
            </Link>
            <div className="linkDiv" onClick={handleLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <Link className="link" to="/">
            <div className="linkDiv">
                Home
            </div>
            </Link>
            <Link className="link" to="/login">
            <div className="linkDiv">
                Login
            </div>
            </Link>
            <Link className="link" to="/register">
            <div className="linkDiv">
                Register
            </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
