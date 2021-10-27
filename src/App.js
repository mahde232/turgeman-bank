import {BrowserRouter as Router,Route} from 'react-router-dom';
import HomePage from './components/HomePage.component';
import Login from './components/Login.component';
import Register from './components/Register.component';
// import Navbar from './components/Navbar.component';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Route path="/" component={HomePage}/> */}
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Router>
    </div>
  );
}

export default App;
