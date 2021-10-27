import React from "react";
import "./HomePage.style.css";
import Img from "../img/logo2.jpg";
const HomePage = () => {
  return (
    <div className="turgeman-bank">
      <img src={Img} alt="bank logo" />
      <h2>Wellcom to Home Page</h2>
      <p>Our Bank is the best in the world</p>
    </div>
  );
};
export default HomePage;
