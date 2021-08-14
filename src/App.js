import React from "react";
import "./App.css";
import Login from "./Auth/Login.js";
import "bootstrap/dist/css/bootstrap.min.css";
import BasePage from "./BasePage";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import Register from "./Auth/Register";
function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/">
              <BasePage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
