import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

class CreateIssue extends Component {
  // const [selectedDate, handleDateChange] = useState(new Date());

  state = {
    title: '',
    category: '',
    date_created: new Date(),
    lead_contributor: '',
    backup_contributor: '',
    description: ''
  };

  handleSubmit = event => {
    event.preventDefault();   
    console.log(this.state);
    const issue = {
      title: this.state.title,
      category: this.state.category,
      date_created: this.state.date_created,
      lead_contributor: this.state.lead_contributor,
      backup_contributor: this.state.backup_contributor,
      description: this.state.description
    }
    axios.post('http://localhost:5000/issues/add',issue)
      .then(res => res.data)
  };

  handleChange = date => {
    this.setState({ startDate: date });
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
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column">
              <div className="centered-content">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" label="Title" margin="normal" onChange={this.handleInputChange} placeholder="What's your issue..."/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" onChange={this.handleInputChange}>
                <option value="" />
                <option value={"PACS"}>PACS</option>
                <option value={"FFI"}>FFI</option>
                <option value={"Networking"}>Networking</option>
              </select>
              <label htmlFor="date_created">Date</label>
              <DatePicker
                id="date_created"
                selected={this.state.startDate}
                onChange={this.handleChange}
                name="date_created"
                calendarAriaLabel	
              />
            </div>

            <div className="column">
              <label htmlFor="lead_contributor">Lead Contributor</label>

              <select id="lead_contributor" name="lead_contributor" onChange={this.handleInputChange}>
                <option value="" />
                <option value={"Mahmoud"}>Mahmoud</option>
                <option value={"Samra"}>Samra</option>
                <option value={"Booboo"}>Booboo</option>
                <option value={"Munai"}>Munai</option>
              </select>
              <label htmlFor="backup_contributor">Backup Contributor</label>

              <select id="backup_contributor" name="backup_contributor" onChange={this.handleInputChange}>
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
              <textarea rows="6" name="description" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <input type="submit" value="Submit"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateIssue;