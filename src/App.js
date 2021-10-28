import HomePage from './components/HomePage.component';
import Login from './components/Login.component';
import Register from './components/Register.component';
import Navbar from './components/Navbar.component';
import Transactions from './components/Transactions.component';
import './App.css';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Route } from 'react-router-dom';
import AddTransaction from './components/addTransaction.component';



function App() {
  const history = useHistory();
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("userLoggedIn")))

  const logoutHandler = () => {
    if (localStorage.getItem("userLoggedIn")) {
      localStorage.removeItem("userLoggedIn");
      setLoggedInUser(null)
      history.push("/");
    }
  }
  const getIndicationOfLoggedInFromSon = (whoLoggedIn) => {
    setLoggedInUser(whoLoggedIn)
  }

  return (
    <div className="App">
        <Navbar logoutCallback={logoutHandler} loggedInUser={loggedInUser} />
        <Route path="/" exact component={HomePage} />
        <Route path="/login" render={() => <Login informFatherOfLogin={getIndicationOfLoggedInFromSon}/>} />
        <Route path="/register" component={Register} />
        <Route path="/transactions" render={() => <Transactions/>} />
        <Route path="/addTransaction" render={() => <AddTransaction/>} />
    </div>
  );
}

export default App;
