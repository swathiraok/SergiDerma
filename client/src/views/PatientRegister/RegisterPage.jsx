import React, { Component } from "react";
import axios from "axios";
import "../../index.scss";
// import Default from '../../components/AppointmentCalender/index';


class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      frstNm: "",
      mddlNm: "",
      lstNm: "",
      gndr: "",
      phnNm: "",
      dob: "",
      email: "",
      type: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
      frstNm: this.state.frstNm,
      mddlNm: this.state.mddlNm,
      lstNm: this.state.lstNm,
      gndr: this.state.gndr,
      phnNm: this.state.phnNm,
      dob: this.state.dob,
      email: this.state.email,
      type: this.state.type
    };

    axios
      .post("http://139.59.3.138:8082/patients/", data)
      .then(res => {
        this.setState({
          frstNm: "",
          mddlNm: "",
          lstNm: "",
          gndr: "",
          phnNm: "",
          dob: "",
          email: "",
          type: ""
        });
        alert("Patient saved successfully");
        this.props.history.push("/patients");
      })
      .catch(err => {
        console.log("Error in Patient Registration!");
      });
  };

  render() {
    return (
      <div className="topspacing">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h5>Register Patient</h5>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="frstNm"
                        className="form-control"
                        placeholder="First Name"
                        value={this.state.frstNm}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="mddlNm"
                        className="form-control"
                        placeholder="Middle Name"
                        value={this.state.mddlNm}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="lstNm"
                        className="form-control"
                        placeholder="Last Name"
                        value={this.state.lstNm}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <div className="form-check float-left">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gndr"
                          value="Male"
                          checked={this.state.gndr === "Male"}
                          onChange={this.onChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check float-left">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gndr"
                          value="Female"
                          checked={this.state.gndr === "Female"}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="phnNm"
                        className="form-control"
                        placeholder="Phone Number"
                        value={this.state.phnNm}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group date">
                      <label>Date Of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        className="form-control"
                        value={this.state.dob}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="form-group">
                      <label htmlFor="type">Type</label> <br />
                      <div className="form-check float-left">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="type"
                          value="Direct"
                          checked={this.state.type === "Direct"}
                          onChange={this.onChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="direct">
                          Direct{" "}
                        </label>
                      </div>
                      <div className="form-check float-left">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="type"
                          value="Referral"
                          checked={this.state.type === "Referral"}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label" htmlFor="referral">
                          Referral
                        </label>
                      </div>
                      <div className="form-check float-left">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="type"
                          value="Practo"
                          checked={this.state.type === "Practo"}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label" htmlFor="practo">
                          Practo
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-2 float-right">
                  <input
                    type="submit"
                    className="btn btn-success btn-block"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <Default /> */}
      </div>
    );
  }
}
export default RegisterPage;
