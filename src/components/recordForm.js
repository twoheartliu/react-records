import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecordAPI from '../utils/RecordsAPI';

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

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit')
    const data = {
      date: this.state.date,
      title: this.state.title,
      amount: Number(this.state.amount)
    }
    RecordAPI.create(data).then(
      response => {
        this.props.addRecord(response.data)
        this.setState({
          date: '',
          title: '',
          amount: ''
        })
      }
    ).catch(
      (error) => console.log(error.message)
    )
  }

  render() {
    return (
      <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
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
