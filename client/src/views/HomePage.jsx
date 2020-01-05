import React, { Component } from "react";
// import { tiles } from "../data/tiles.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import "../index.scss";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.doctors = this.doctors.bind(this);
    this.patients = this.patients.bind(this);
    this.home = this.home.bind(this);

    this.consultaion = this.consultaion.bind(this);
    this.createappointments = this.createappointments.bind(this);
    this.appointments = this.appointments.bind(this);
  }
  register() {
    this.props.history.push("/register");
  }
  doctors() {
    this.props.history.push("/doctors");
  }
  patients() {
    this.props.history.push("/patients");
  }
  home() {
    this.props.history.push("/");
  }
  consultaion() {
    this.props.history.push("/consultaion");
  }
  createappointments() {
    this.props.history.push("/bookAppointments");
  }
  appointments() {
    this.props.history.push("/appointments");
  }
  render() {
    return (
      <div className="topspacing container">
        <div className="row">
          <button className="tiles" onClick={this.register}>
            Register
          </button>
          <button className="tiles" onClick={this.doctors}>
            Doctors
          </button>
          <button className="tiles" onClick={this.patients}>
            Patients
          </button>
          <button className="tiles" onClick={this.consultaion}>
            Consultaion
          </button>
          <button className="tiles" onClick={this.createappointments}>
            Book Appointment
          </button>
          <button className="tiles" onClick={this.appointments}>
            Todays Appointments
          </button>
          <button className="tiles" onClick={this.home}>
            Notes
          </button>
          <button className="tiles" onClick={this.home}>
            Reports
          </button>

          {/* {tiles.map(tile => (
            <div className="float-left tiles">{tile.tileName}</div>
          ))} */}
        </div>
        <div className="svgIconWrap">
          <Fab
            color="primary"
            aria-label="Add"
            href="/register"
            className="registerPatient"
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

export default HomePage;
