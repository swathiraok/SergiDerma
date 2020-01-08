import React, { Component } from "react";
import axios from "axios";
import "react-table/react-table.css";
import ReactTable from "react-table";
import  Search from '../components/Search';
import StartIcon from '../assets/images/play_icon.png';
import StopIcon from '../assets/images/stop_icon.png';
import AddIcon from '../assets/images/add_icon.png';
import * as ReactDOM from "react-dom";
// table columns
// const columns = [
//   {
//     Header: "Full Name",
//     accessor: "frstNm"
//   },
//   {
//     Header: "Gender",
//     accessor: "gndr"
//   },
//   {
//     Header: "Age",
//     accessor: "dob"
//   }
// ];

// function MyCell({ value, columnProps: { rest: { someFunc } } }) {
//   return <a href="#" onClick={someFunc}>{value}</a>
// }
class Patients extends Component {
  constructor() {
    super();
    this.state = {
      // query: "",
      // results: [],
      tableData: [
        {
          frstNm: "",
          gndr: "",
          dob: ""
        }
      ]
    };
    this.handleClick=this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleClick(){
    this.props.history.push("/patientInfo");
  }
  // handleEdit(e){
  //   alert('edit button clicked');
  // }
  // handleDelete(){
  //   alert('delete button clicked');
  // }
  dataTableElement = null;
  componentDidMount(e) {
    let theads = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-thead");
    let tbody = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-tbody")[0];


    tbody.addEventListener("scroll", () => {
      for (let i = 0; i < theads.length; i++) {
        theads.item(i).scrollLeft = tbody.scrollLeft;
      }
    });
    // get all appointm
    // get all patients
    axios
      .get("http://139.59.3.138:8082/patients/")
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
  handleInputChange(e) {
    const searchValue = e.target.value;
    axios
      .get(
        `http://139.59.3.138:8082/patients/`
      )
      .then(response => response.data)
      .then(data => {
        this.setState({ tableData: data });
      });
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.tableData;
      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item to lowercase
        const lc = item.toString().toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.tableData;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      tableData: newList
    });
  }
  // handleInputChange = () => {
  //   this.setState(
  //     {
  //       query: this.search.value
  //     },
  //     () => {
  //       if (this.state.query && this.state.query.length > 1) {
  //         if (this.state.query.length % 2 === 0) {
  //           this.getInfo();
  //         }
  //       }
  //     }
  //   );
  // };
  render() {
    const { tableData } = this.state;
    return (
      <div className="topspacing">
         <Search />
        <div className="container">
          <h5>Patient List</h5>
          <ReactTable
            data={tableData}
            columns={[{
              Header: 'Patient Name',
              accessor: 'frstNm'
            }, {
              Header: 'Gender',
              accessor: 'gndr'
          }, {
            Header: 'Date Of Birth',
            accessor: 'dob'
        },{
              Header: 'Actions',
              width: 400,
              Cell: row => (
                <div>
                    <button className="icons"><img src={StartIcon} alt="Start consultation"/></button>
                    <button className="icons"><img src={StopIcon} alt="Stop consultation"/></button>
                    <button className="icons addIcon" onClick={this.handleClick}><img src={AddIcon} alt="Add Information"/></button>
                </div>
            )
              // Cell: MyCell,
              // getProps: () => ({ someFunc: () => alert("clicked")})
          }]}
            // defaultPageSize={10}
            // pageSizeOptions={[10, 30, 50]}
            // showPagination={true}
            style={{
              height: "300px"
            }}
            className="-striped -highlight"
            showPagination={false}
            ref={(element) => { this.dataTableElement = element; }}
          />
        </div>
      </div>
    );
  }
}

export default Patients;
