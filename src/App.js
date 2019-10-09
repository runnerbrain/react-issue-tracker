import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import IssuesList from "./components/issues/IssuesList";
import CreateIssue from "./components/issues/CreateIssue";
import EditIssue from "./components/issues/EditIssue";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  const linksStyle = {
    paddingRight: "20px"
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <h1>Issue tracker</h1>
        </div>
        <Router>
          <div className="navbar">
            <div className="leftLinks" style={linksStyle}>
              <Link to="/issues">
                {" "}
                <i className="material-icons">list</i>
              </Link>
              <Link to="/issues/create">
                <i className="material-icons">add</i>
              </Link>
            </div>
          </div>
          <Switch>
            <Route exact path="/" component={IssuesList} />
            <Route exact path="/issues" component={IssuesList} />
            <Route exact path="/issues/create" component={CreateIssue} />
            <Route exact path="/issues/edit/:id" component={EditIssue} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
