import React, { Component } from "react";
import axios from "axios";
import "react-table/react-table.css";
import ReactTable from "react-table";

// table columns
const columns = [
  {
    Header: "Time",
    accessor: "time"
  },
  {
    Header: "Doctor Name",
    accessor: "drNm"
  },
  {
    Header: "Patient Name",
    accessor: "ptNm"
  }
];

// function MyCell({ value, columnProps: { rest: { someFunc } } }) {
//   return <a href="#" onClick={someFunc}>{value}</a>
// }
class Appointments extends Component {
  constructor() {
    super();
    this.state = {
      // query: "",
      // results: [],
      tableData: [
        {
          time: "",
            drNm: "",
            ptNm: ""
        }
      ]
    };
  }
  // handleEdit(e){
  //   alert('edit button clicked');
  // }
  // handleDelete(){
  //   alert('delete button clicked');
  // }
  componentDidMount(e) {
    // get all appointments
    axios
      .get("http://localhost:8082/appointments/")
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
            defaultPageSize={10}
            pageSizeOptions={[10, 30, 50]}
            showPagination={true}
          />
        </div>
      </div>
    );
  }
}

export default Appointments;
