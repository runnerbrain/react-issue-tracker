import React, { Component} from "react";
import { Redirect } from 'react-router-dom';
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditIssue extends Component {
  formStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ddd"
  };

  state = {
    title: "",
    category: "",
    date_created: new Date(),
    lead_contributor: "",
    backup_contributor: "",
    description: "",
    toList : false
  };

  componentDidMount() {
    const _id = this.props.match.params.id;
    Axios.get(`http://localhost:5000/issues/${_id}`)
      .then(result =>
        this.setState({
          title: result.data.title,
          category: result.data.category,
          date_created: new Date(result.data.date_created),
          lead_contributor: result.data.lead_contributor,
          backup_contributor: result.data.backup_contributor,
          description: result.data.description
        })
      )
      .catch(err => console.log(err));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const issue = {
      title: this.state.title,
      category: this.state.category,
      date_created: this.state.date_created,
      lead_contributor: this.state.lead_contributor,
      backup_contributor: this.state.backup_contributor,
      description: this.state.description
    }

    Axios.put(`http://localhost:5000/issues/edit/${this.props.match.params.id}`,issue)
    .then(res => {
      this.setState({toList: true});
      return res.data;
    })
    .catch(err => console.log('Error editing -- '+err));
  }

  handleChange = date => {
    console.log(date)
    this.setState({ date_created: date });
  };

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name] : value
    })
  }

  render() {
    if(this.state.toList === true){
      return <Redirect to='/' />
    }

    return (
      <form style={this.formStyle} onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="column">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              label="Title"
              margin="normal"
              onChange={this.handleInputChange}
              placeholder="What's your issue..."
              value={this.state.title}
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
            >
              <option value="" />
              <option value={"PACS"}>PACS</option>
              <option value={"FFI"}>FFI</option>
              <option value={"Networking"}>Networking</option>
            </select>
            <label htmlFor="date_created">Date</label>
            <DatePicker
              id="date_created"
              selected={this.state.date_created}
              value={this.state.date_created}
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>

          <div className="column">
            <label htmlFor="lead_contributor">Lead Contributor</label>

            <select
              id="lead_contributor"
              name="lead_contributor"
              value={this.state.lead_contributor}
              onChange={this.handleInputChange}
            >
              <option value="" />
              <option value={"Mahmoud"}>Mahmoud</option>
              <option value={"Samra"}>Samra</option>
              <option value={"Booboo"}>Booboo</option>
              <option value={"Munai"}>Munai</option>
            </select>
            <label htmlFor="backup_contributor">Backup Contributor</label>

            <select
              id="backup_contributor"
              name="backup_contributor"
              value={this.state.backup_contributor}
              onChange={this.handleInputChange}
            >
              <option value="" />
              <option value={"Mahmoud"}>Mahmoud</option>
              <option value={"Samra"}>Samra</option>
              <option value={"Booboo"}>Booboo</option>
              <option value={"Munai"}>Munai</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label htmlFor="">Description</label>
            <textarea
              rows="6"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    );
  }
}

export default EditIssue;
