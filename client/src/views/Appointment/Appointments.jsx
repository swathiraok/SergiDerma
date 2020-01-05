import React, { Component } from "react";
import axios from "axios";
import "react-table/react-table.css";
import ReactTable from "react-table";

// table columns
const columns = [
  {
    Header: "Doctor Name",
    accessor: "drNm"
  },
  {
    Header: "Patient Name",
    accessor: "ptNm"
  },
  {
    Header: "Time",
    accessor: "time"
  }
];

class Appointments extends Component {
  constructor() {
    super();
    this.state = {
      tableData: [
        {
          drNm: "",
          ptNm: "",
          time: ""
        }
      ]
    };
  }

  componentDidMount(e) {
    // get all appointments
    axios
      .get("http://139.59.3.138:8082/appointments/")
      .then(response => response.data)
      .then(data => {
        this.setState({ tableData: data });
      });
  }
  render() {
    const { tableData } = this.state;
    return (
      <div className="container">
        <div className="topspacing">
          <h5>Todays Appointments</h5>
          <ReactTable
            data={tableData}
            columns={columns}
            defaultPageSize={5}
            pageSizeOptions={[10, 30, 50]}
            showPagination={true}
          />
        </div>
      </div>
    );
  }
}

export default Appointments;
