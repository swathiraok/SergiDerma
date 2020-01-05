import React, { Component } from "react";
import axios from "axios";
import "react-table/react-table.css";
import ReactTable from "react-table";

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
  componentDidMount(e) {
    // get all patients
    axios
      .get("http://139.59.3.138:8082/patients/")
      .then(response => response.data)
      .then(data => {
        this.setState({ tableData: data });
      });
  }
  getInfo = () => {
    axios.get("http://139.59.3.138:8082/patients/").then(({ data }) => {
      this.setState({
        tableData: data 
      });
    });
  };
  
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
        <div className="container">
         {/* <form>
          <input
            placeholder="Search for..."
            ref={input => (this.search = input)}
            onChange={this.handleInputChange}
          />
        </form> */}
          <h5>Patient List</h5>
          <ReactTable
            data={tableData}
            columns={[{
              Header: 'Full Name',
              accessor: 'frstNm'
            }, {
              Header: 'Gender',
              accessor: 'gndr'
          }, {
            Header: 'Age',
            accessor: 'dob'
        },{
              Header: 'Actions',
              width: 400,
              Cell: row => (
                <div>
                    <button className="btn btn-success btn-block">Start Consultation</button>
                    <button className="btn btn-success btn-block btn-stop">Stop Consulation</button>
                    <button className="btn btn-success btn-block btn-add"onClick={this.handleClick}>Add</button>
                </div>
            )
              // Cell: MyCell,
              // getProps: () => ({ someFunc: () => alert("clicked")})
          }]}
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
