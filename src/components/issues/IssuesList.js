import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TimeAgo from "react-timeago";
import CommentModal from './../comments/CommentModal';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



const Issue = props => {
  const { issue, deleteIssue, showComment  } = props;

  return (
    <tr>
      <td>{issue.title}</td>
      <td>{issue.category}</td>
      <td>{<TimeAgo date={issue.date_created} />}</td>
      <td>{issue.lead_contributor}</td>
      <td>{issue.backup_contributor}</td>
      <td>
        <Link to={`/issues/edit/${issue._id}`}>
          <i class="material-icons">edit</i>
        </Link>
        <Link to={`/issues`}>
          <i class="material-icons" onClick={ () => deleteIssue(issue._id)}>
            delete
          </i>
        </Link>
        <Link to={`/#`}>
          <i class="material-icons" onClick={ () => showComment(issue._id)} >
            comment
          </i>
        </Link>
      </td>
    </tr>
  );
};

class IssuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      modal: false
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
      .then(res => this.setState({ issues: res.data }))
      .catch(err => console.log(err));

  }

  issuesList() {
    return this.state.issues.map(currentIssue => (
      <Issue
        issue={currentIssue}
        key={currentIssue._id}
        deleteIssue={this.deleteIssue}
        showComment={this.showComment}
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

  showComment = id => {
    console.log("This is comment for " + id);
    this.setState(prevState => ({modal: !prevState.modal}));
    console.log(`showComment is: ${this.state.modal}`);
   
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
        <CommentModal modal={this.state.modal} showComment={this.showComment}/>
        
      </Fragment>
    );
  }
}

export default IssuesList;
