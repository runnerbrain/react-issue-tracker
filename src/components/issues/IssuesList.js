import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Issues = props => {
  const { issue } = props;
  return (
    <tr>
      <td>{issue.title}</td>
      <td>{issue.category}</td>
      <td>{issue.date_created}</td>
      <td>{issue.lead_contributor}</td>
      <td>{issue.backup_contributor}</td>
      <td>
        <Link to={"/edit/"}>
          <button>edit</button>
        </Link>
      </td>
    </tr>
  );
};

class IssuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: []
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/issues")
      .then(res => this.setState({ issues: res.data }))
      .catch(err => console.log(err));
  }

  issuesList() {
    return this.state.issues.map(currentIssue => (
      <Issues issue={currentIssue} key={currentIssue._id} />
    ));
  }

  render() {
    return (
      <Fragment>
        <h3>Issues List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date issued</th>
              <th>Lead</th>
              <th>Backup</th>
            </tr>
          </thead>
          <tbody>{this.issuesList()}</tbody>
        </table>
      </Fragment>
    );
  }
}

export default IssuesList;
