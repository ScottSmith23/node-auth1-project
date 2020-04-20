import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>   
          </ul>
        </nav>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/users" component={UserPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
