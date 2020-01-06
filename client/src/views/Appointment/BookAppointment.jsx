import React, { Component,useState } from "react";
import axios from "axios";
import "../../index.scss";
// import moment from 'moment';

// import MomentUtils from '@date-io/moment';
// import {
//   DatePicker,
//   TimePicker,
//   DateTimePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";


const timeOptions = [
  { value: "Select Time", Label: "Select Time" },
  { value: "9:30AM - 10:00AM", Label: "9:30AM - 10:00AM" },
  { value: "10:00AM - 10:30AM", Label: "10:00AM - 10:30AM" },
  { value: "10:30AM - 11:00AM", Label: "10:30AM - 11:00AM" },
  { value: "11:00AM - 11:30AM", Label: "11:00AM - 11:30AM" },
  { value: "11:30AM - 12:00PM", Label: "11:30AM - 12:00PM" },
  { value: "12:00PM - 12:30PM", Label: "12:00PM - 12:30PM" },
  { value: "12:30PM - 1:00PM", Label: "12:30PM - 1:00PM" },
  { value: "1:00PM - 1:30PM", Label: "1:00PM - 1:30PM" },
  { value: "1:30PM - 2:00PM", Label: "1:30PM - 2:00PM" },
  { value: "5:00PM - 5:30PM", Label: "5:00PM - 5:30PM" },
  { value: "5:30PM - 6:00PM", Label: "5:30PM - 6:00PM" },
  { value: "6:00PM - 6:30PM", Label: "6:00PM - 6:30PM" },
  { value: "6:30PM - 7:00PM", Label: "6:30PM - 7:00PM" },
  { value: "7:00PM - 7:30PM", Label: "7:00PM - 7:30PM" },
  { value: "7:30PM - 8:00PM", Label: "7:30PM - 8:00PM" }
];


// const {selectedDate, setSelectedDate} = new Date();

class BookAppointment extends Component {
  constructor() {
    super();
    this.state = {
      drNm: "",
      ptNm: "",
      date: new Date(),
      time: "",
     // handleDateChange: useState(new Date())
      // setSelectedDate: new Date
    };
    this.onChange = this.onChange.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
  }
  // handleDateChange(date) {
  //   console.log('date is::' +date);
  //   // this.setState({ [date.target.name]: date.target.value });
  //    this.setState( {date});
  // };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
      drNm: this.state.drNm,
      ptNm: this.state.ptNm,
      date: this.state.date,
      time: this.state.time
    };

    axios
      .post("http://139.59.3.138:8082/appointments/", data)
      .then(res => {
        this.setState({
          drNm: "",
          ptNm: "",
          date: "",
          time: ""
        });
        alert("Appointment created successfully");
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error in appointment creation!");
      });
  };

  render() {
    return (
      <div className="topspacing appointmentWrap">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h5>Book Appointment</h5>
              {/* <MuiPickersUtilsProvider utils={MomentUtils}> */}
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="drNm"
                        className="form-control"
                        placeholder="Doctor Name"
                        value={this.state.drNm}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="ptNm"
                        className="form-control"
                        placeholder="Patient Name"
                        value={this.state.ptNm}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group date">
                      <label>Date</label>
                      <input
                        type="date"
                        name="date"
                        className="form-control"
                        placeholder="Date"
                        value={this.state.date}
                        onChange={this.onChange}
                        required
                      />
                      {/* <DatePicker
                        openTo="year"
                        format="dd/MM/yyyy"
                        label="Date Of Appointment"
                        views={["year", "month", "date"]}
                        value={this.state.date}
                        onChange={this.handleDateChange} 
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <label>Time</label>
                      <select
                        value={this.state.time}
                        onChange={this.onChange}
                        required
                        name="time"
                      >
                        {timeOptions.map(option => (
                          <option value={option.value}>{option.Label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-md-2  float-right">
                  <input
                    type="submit"
                    className="btn btn-success btn-block"
                    value="Submit"
                  />
                </div>
              </form>
              {/* </MuiPickersUtilsProvider> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BookAppointment;
