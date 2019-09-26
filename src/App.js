import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import IssuesList from "./components/issues/IssuesList";
import CreateIssue from "./components/issues/CreateIssue";
import EditIssue from "./components/issues/EditIssue";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="header">
          <h1>Issue tracker</h1>
          <p>
            Using <b>React flexible</b> layout.{" "}
          </p>
        </div>
        <Router>
          <div className="navbar">
            <Link to="/">Issues</Link>
            <Link to="/issues/create">New</Link>
            <Link to="/issues/edit">Edit</Link>
          </div>
          <Route>
            <Route exact path="/" component={IssuesList} />
            <Route exact path="/issues/create" component={CreateIssue} />
            <Route exact path="/issues/edit/:id" component={EditIssue} />
          </Route>
        </Router>
      </div>
    </div>
  );
}

export default App;
