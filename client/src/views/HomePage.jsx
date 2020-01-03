import React, { Component } from "react";
// import { tiles } from "../data/tiles.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import "../index.scss";

class HomePage extends Component {
  constructor(props){
      super(props);
      this.register = this.register.bind(this);
      this.doctors = this.doctors.bind(this);
      this.home = this.home.bind(this);
  }
  register(){
     this.props.history.push("/register");
  }
  doctors(){
     this.props.history.push("/doctors");
  }
  home(){
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="row topspacing container">
        <div className="col-md-12">
          <button className="float-left tiles" onClick={this.register}>Register</button>
           <button className="float-left tiles" onClick={this.doctors}>Doctors</button>
            <button className="float-left tiles" onClick={this.home}>Patients</button>
             <button className="float-left tiles" onClick={this.home}>Prescriptions</button>
              <button className="float-left tiles" onClick={this.home}>Documents</button>
               <button className="float-left tiles" onClick={this.home}>Invoices</button>
                <button className="float-left tiles" onClick={this.home}>Notes</button>
                 <button className="float-left tiles" onClick={this.home}>Reports</button>

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
