import React, { Component } from "react";
import axios from "axios";
import "react-table/react-table.css";
import ReactTable from "react-table";

// table columns
const columns = [
  {
    Header: "Full Name",
    accessor: "frstNm"
  },
  {
    Header: "Gender",
    accessor: "gndr"
  },
  {
    Header: "Age",
    accessor: "dob"
  }
];
class Patients extends Component {
  constructor() {
    super();
    this.state = {
      tableData: [
        {
          frstNm: "",
          gndr: "",
          dob: ""
        }
      ]
    };
  }
  componentDidMount(e) {
    // get all patients
    axios
      .get("http://139.59.3.138:8082/patients/")
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
          <h5>Patient List</h5>
          <ReactTable
            data={tableData}
            columns={columns}
            defaultPageSize={10}
            pageSizeOptions={[10, 30, 50]}
            showPagination={true}
          />
        </div>
      </div>
    );
  }
}

export default Patients;
