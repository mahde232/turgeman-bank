import React,{useState} from "react";
import "./HomePage.style.css";
import HelloScreen from '../img/HelloScreen.jpg'
import HelloScreen2 from '../img/HelloScreen2.jpg'
const HomePage = () => {
  const [loggedInUser] = useState(JSON.parse(localStorage.getItem("userLoggedIn")));

  return (
    <>
    <div className="turgeman-bank">
      <div>
        <h1>The Itay-Turgeman Bank</h1>
        <h3>Welcome to the biggest bank in Demona!</h3>
        {loggedInUser ? <img id='img1' src={HelloScreen} alt='test'/> : <img id='img2' src={HelloScreen2} alt='test'/>}
        <div className='picturesFlex'></div>
      </div>
    </div>
    <div>
    </div>
    </>
  );
};
export default HomePage;
