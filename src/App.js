import {BrowserRouter as Router,Route} from 'react-router-dom';
import HomePage from './components/HomePage.component';
import Login from './components/Login.component';
import Register from './components/Register.component';
import Navbar from './components/Navbar.component';
import './App.css';
import React,{ useState, useEffect } from 'react';

function App() {
  const [loggedInUser,setLoggedInUser] = useState(null)

  const getLoggedInUser = (objOfUser) => {
    console.log('father was informed=',objOfUser);
    setLoggedInUser(objOfUser);
  }
  const logoutHandler = () => {
    setLoggedInUser(null)
  }

  return (
    <div className="App">
      <Router>
        <Navbar whoIsLoggedIn={loggedInUser} logoutCallback={logoutHandler}/>
        <Route path="/" exact component={HomePage}/>
        <Route path="/login" render={()=> <Login informFatherOfLoggedInUser={getLoggedInUser} loggedInUser={loggedInUser}/>}/>
        {/* <Route path="/login" component={Login}/> */}
        <Route path="/register" component={Register}/>
      </Router>
    </div>
  );
}

export default App;
