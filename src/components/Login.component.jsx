import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.style.css";

const loginAPIURL =
  "https://6178efcbaa7f3400174045f4.mockapi.io/users/?username=";

export default function Login({informFatherOfLogin}) {
  const history = useHistory();
  const [loggedInUser, setLoggedIn] = useState(JSON.parse(localStorage.getItem("userLoggedIn")));
  const [userObj, setObj] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => { //inputs handler
    e.target.style.border = "";
    setObj((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onFormSubmit = async (e) => { //form submit handler
    e.preventDefault(); //prevent default form submitting
    let isGoodToGo = true;

    Object.entries(userObj).forEach((item, index) => {
      //go over all the keys in the state object, check if any of them is empty
      if (item[1].length === 0) {
        e.target[index].style.border = "1px solid red";
        isGoodToGo = false; //if empty, set isGoodToGo to false, to prevent the api call from having empty values
      }
    });
    if (isGoodToGo) {
      //if all values are set, everything is good to go.
      const apiResponse = await axios.get(`${loginAPIURL}${userObj.username}`);
      if (apiResponse.status === 200) {
        //grabbed users succesfully
        if (apiResponse.data.length !== 0 && apiResponse.data[0].username.toLowerCase() === userObj.username.toLowerCase() && apiResponse.data[0].password === userObj.password) {
          setLoggedIn(apiResponse.data[0]);
          localStorage.setItem("userLoggedIn", JSON.stringify({
            id: apiResponse.data[0].id,
            firstName: apiResponse.data[0].firstName,
            allowance: apiResponse.data[0].allowance})
          );
          alert('logged in succesfully')
          informFatherOfLogin(apiResponse.data[0])
          history.push({ pathname: "/"});
        } else {
          alert("invalid username or password");
          console.log("invalid username or password");
          //add/display div that gives feedback that password or username are wrong.
        }
        e.target.reset();
        //add/display div that gives feedback that user successfully logged in.
      } else {
        console.log("failed", apiResponse);
        //add/display div that gives feedback that something went wrong.
      }
    }
  };
  if (loggedInUser) {
    history.push("/");
  }
  return (
    <div className="loginContainer">
      <div className="loginDiv">
        {loggedInUser ? (
          <>Already Logged In</>
        ) : (
          <>
            <h3>Login</h3>
            <form id={"loginForm"} onSubmit={onFormSubmit}>
              <div>
                <input
                  type="text"
                  name={"username"}
                  placeholder="Username"
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name={"password"}
                  autoComplete="new-password"
                  placeholder="Password"
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <input type="submit" value="Login" />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
