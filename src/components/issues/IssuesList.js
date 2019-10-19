import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TimeAgo from "react-timeago";
import CommentModal from "./../comments/CommentModal";

const Issue = props => {
  const { issue, deleteIssue, showCommentForm } = props;

  return (
    <tr>
      <td>{issue.title}</td>
      <td>{issue.category}</td>
      <td>{<TimeAgo date={issue.date_created} />}</td>
      <td>{issue.lead_contributor}</td>
      <td>{issue.backup_contributor}</td>
      <td>
        <Link to={`/issues/edit/${issue._id}`}>
          <i className="material-icons">edit</i>
        </Link>
        <Link to={`/issues`}>
          <i className="material-icons" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))deleteIssue(issue._id)}}>
            delete
          </i>
        </Link>
        <Link to={`/#`}>
          <i
            className="material-icons"
            onClick={() => showCommentForm(issue._id)}
          >
            comment
          </i>
        </Link>
      </td>
    </tr>
  );
};

//====================================================================

class IssuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      comments: [],
      modal: false,
      issue_id: "",
      selectedIssue: {},
      created_at: Date()
    };
  }

  handleClose = () => {
    this.setState({ commentShow: false });
  };

  handleShow = () => {
    this.setState({ commentShow: true });
  };

  componentDidMount() {
    Axios.get("http://localhost:5000/issues")
      .then(res => {
        this.setState({ issues: res.data });
      })
      .catch(err => console.log(err));
  }
  issuesList() {
    return this.state.issues.map(currentIssue => (
      <Issue
        issue={currentIssue}
        key={currentIssue._id}
        deleteIssue={this.deleteIssue}
        showCommentForm={this.showCommentForm}
      />
    ));
  }

  deleteIssue = id => {
    Axios.delete(`http://localhost:5000/issues/delete/${id}`).then(res =>
      console.log(res.data)
    );
    this.setState({
      issues: this.state.issues.filter(el => el._id !== id)
    });
  };

  showCommentForm = id => {
    this.setState(prevState => ({ modal: !prevState.modal }));
    if (!this.state.modal) {
      var selectedIssue= this.state.issues.find(el => el._id === id);
      this.setState({ comments: selectedIssue.comments });
      this.setState({ issue_id: id });
      this.setState({selectedIssue});
    }
  };

  handleCommentSave = comment => {
    const commentObj = {
      comment: comment,
      created_at: this.state.created_at,
      issue_id: this.state.issue_id
    };
    Axios.post(
      `http://localhost:5000/issues/${commentObj.issue_id}/comments/add`,
      commentObj
    )
      .then(res => {
        this.setState({ comments: res.data.comments });
        return res.data;
      })
      .catch(err => console.log("Error submitting comment: " + err));

  };

  render() {
    return (
      <Fragment>
        <h3>Issues List</h3>
        <div className="row">
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
        </div>
        <div className="modal-container">
          <CommentModal
            modal={this.state.modal}
            comments={this.state.comments}
            value={this.state.newComment}
            onTextAreaChange={this.handleTextAreaChange}
            showCommentForm={this.showCommentForm}
            onSaveComment={this.handleCommentSave}
            selectedIssue = {this.state.selectedIssue}
          />
        </div>
      </Fragment>
    );
  }
}

export default IssuesList;
