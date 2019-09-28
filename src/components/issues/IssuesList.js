import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TimeAgo from "react-timeago";

const Issues = props => {
  const { issue,deleteIssue } = props;
  return (
    <tr>
      <td>{issue.title}</td>
      <td>{issue.category}</td>
      <td>{<TimeAgo date={issue.date_created} />}</td>
      <td>{issue.lead_contributor}</td>
      <td>{issue.backup_contributor}</td>
      <td>
        <Link to={`/issues/edit/${issue._id}`}>
          <button>edit</button>
        </Link>
        <Link to={`/issues`}>
          <button onClick={() => deleteIssue(issue._id)}>delete</button>
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
      <Issues issue={currentIssue} key={currentIssue._id} deleteIssue={this.deleteIssue}/>
    ));
  }

   deleteIssue = (id) => {
    Axios.delete(`http://localhost:5000/issues/delete/${id}`)
      .then(res => console.log(res.data));
    this.setState({
      issues: this.state.issues.filter(el => el._id !== id)
    })
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.issuesList()}</tbody>
        </table>
      </Fragment>
    );
  }
}

export default IssuesList;
