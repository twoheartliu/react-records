import React, { Component } from 'react';
import Record from './Record';
// import { getJSON } from 'jquery';
import * as RecordsAPI from '../utils/RecordsAPI';
import RecordForm from './recordForm';

class Records extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }

  componentDidMount() {
    RecordsAPI.getAll().then(
      response => this.setState({
        records: response.data,
        isLoaded: true
      })
    ).catch(error => this.setState({
      isLoaded: true,
      error
    }))
  }

  handleAddRecord = (record) => {
    console.log(record)
    this.setState({
      error: null,
      isLoaded: true,
      records: [...this.state.records, record]
    })
  }

  render() {
    const { isLoaded, error, records } = this.state;
    let recordComponent;
    if (error) {
      return <div>Error: {error.message}</div>
    }
    if (isLoaded === false) {
      return <div>loading……</div>
    } else {
      recordComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => <Record {...record} key={record.id} />)}
            {/* <Record /> */}
          </tbody>
        </table>
      )
    }

    return (
      <div>
        <h2>Records</h2>
        <RecordForm addRecord={this.handleAddRecord}/>
        {recordComponent}
      </div>
    )
  }
}

export default Records;
