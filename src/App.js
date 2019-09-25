import React from "react";
import {Route, Link, Switch } from "react-router-dom";
import IssuesList from "./components/issues/IssuesList";
import CreateIssue from "./components/issues/CreateIssue";
import EditIssue from "./components/issues/EditIssue";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Issue tracker</h1>
          <p>
            Using <b>React flexible</b> layout.{" "}
          </p>
        </div>
        <div className="navbar">
          <Link to="/issues">Issues</Link>
          <Link to="/issues/create">New</Link>
          <Link to="/issues/edit">Edit</Link>
        </div>

          <Switch>
            <Route>
              <Route exact path="/issues" component={IssuesList} />
              <Route exact path="/issues/create" component={CreateIssue} />
              <Route exact path="/issues/edit" component={EditIssue} />
            </Route>
          </Switch>
      </div>
    </div>
  );
}

export default App;
