import React, { Component } from "react";
// import { tiles } from "../data/tiles.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Appointments from "./Appointment/Appointments";
import Search from "../components/Search";

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
        <Appointments />
        <div className="row">
        <button className="tiles" onClick={this.createappointments}>
        <i class="far fa-calendar"></i>
            Book Appointment
          </button>
          <button className="tiles" onClick={this.consultaion}>
          <i class="far fa-calendar-check"></i>
            Start Consultaion
          </button>
          <button className="tiles" onClick={this.register}>
          <i class="fas fa-users"></i>

            Register
          </button>
          <button className="tiles" onClick={this.doctors}>
          <i class="fas fa-users"></i>
            Doctors
          </button>
          <button className="tiles" onClick={this.patients}>
          <i class="fas fa-users"></i>
            Patients
          </button>
         
          
          <button className="tiles" onClick={this.appointments}>
          <i class="far fa-calendar-check"></i>
            Todays Appointments
          </button>
          <button className="tiles" onClick={this.home}>
          <i class="far fa-comment-alt"></i>
            Notes
          </button>
          <button className="tiles" onClick={this.home}>
          <i class="far fa-list-alt"></i>
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
