import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecordForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      title: '',
      amount: ''
    }
  }

  valid() {
    return this.state.amount && this.state.date && this.state.title
  }
  
  handleChange(event) {
    let name, obj;
    name = event.target.name;
    this.setState((
      obj = {},
      obj[String(name)] = event.target.value,
      obj
    ))
  }

  render() {
    return (
      <form className="form-inline mb-3">
        <div className="form-group mr-1">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date} />
        </div>
        <div className="form-group mr-1">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
        </div>
        <div className="form-group mr-1">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Amount" name="amount" value={this.state.amount} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    );
  }
}

RecordForm.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number,
}

export default RecordForm;
