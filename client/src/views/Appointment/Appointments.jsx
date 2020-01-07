import React, { Component } from "react";
import axios from "axios";
import "react-table/react-table.css";
import ReactTable from "react-table";
import * as ReactDOM from "react-dom";

// table columns
const columns = [
  {
    Header: "Doctor",
    accessor: "drNm"
  },
  {
    Header: "Patient",
    accessor: "ptNm"
  },
  {
    Header: "Date",
    accessor: "date"
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
          date: "",
          time: "",
          active: false
        }
      ]
    };
    
    this.showUpcoming = this.showUpcoming.bind(this);
    this.showToday = this.showToday.bind(this);
  }
  dataTableElement = null;
  componentDidMount() {
    let theads = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-thead");
    let tbody = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-tbody")[0];


    tbody.addEventListener("scroll", () => {
      for (let i = 0; i < theads.length; i++) {
        theads.item(i).scrollLeft = tbody.scrollLeft;
      }
    });
    // get all appointments
    axios
      .get("http://139.59.3.138:8082/appointments/")
      .then(response => response.data)
      .then(data => {
        this.setState({ tableData: data });
      });
     
  }
  componentDidUpdate() {
    let theads = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-thead");
    let tbody = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-tbody")[0];


    if (tbody.scrollHeight > tbody.clientHeight) {
      for (let i = 0; i < theads.length; i++) {
        theads.item(i).classList.add("vertical-scrollbar-present");
      }
    }
    else {
      for (let i = 0; i < theads.length; i++) {
        theads.item(i).classList.remove("vertical-scrollbar-present");
      }
    }
  }
  showUpcoming(e){
    e.preventDefault();
    this.setState(prevState  => ({ active: !prevState.active }));
    axios
    .get("http://139.59.3.138:8082/appointments/upcoming")
    .then(response => response.data)
    .then(data => {
      this.setState({ tableData: data });
    });
   
  }
  showToday(e) {
    e.preventDefault();
    // this.setState({ active: !this.state.active });
    this.setState(prevState  => ({ active: !prevState.active }));
    axios
    .get("http://139.59.3.138:8082/appointments/")
    .then(response => response.data)
    .then(data => {
      this.setState({ tableData: data });
    });
  }
 
  render() {
    const { tableData } = this.state;
    const { active } = this.state;

    return (
        <div className="topspacing">
          <h5>Patient Appoinment</h5>
          <div className="buttonWrap">
          <input
                    type="submit"
                    className="btn btn-success btn-block"
                    value="Upcoming"
                    onClick={this.showUpcoming}
                    // className={this.state.active && 'active'}
                    // className={`${active ? "" : "active"}`}
                  />
                   <input
                    type="submit"
                    className="btn btn-success btn-block"
                    // className={this.state.active ? 'active': null} 
                    // className={`${active ? "" : "active"}`}
                    value="Today"
                    onClick={this.showToday}
                  />
          </div>
          <ReactTable
            data={tableData}
            columns={columns}
            style={{
              height: "300px"
            }}
            className="-striped -highlight"
            showPagination={false}
            ref={(element) => { this.dataTableElement = element; }}
          />
        </div>
    );
  }
}

export default Appointments;
