import React, { Component } from 'react';
import axios from 'axios';
import '../../index.scss';
// import CheckBox from '../../components/CheckBox';
// import Input from '../../components/Input';

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
            frstNm: '',
            mddlNm: '',
            lstNm: '',
            gndr: '',
            phnNm: '',
            dob: '',
            email: '',
            type: []
        }
        // typeOptions : ["Walkin", "Referral", "Practo"]
   
    // this.handleCheckBox = this.handleCheckBox.bind(this);
    // this.handleInput = this.handleInput.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };
//    handleInput(e) {
//      let value = e.target.value;
//     let name = e.target.name;
//     this.setState(
//       prevState => ({
//         newPatient: {
//           ...prevState.newPatient,
//           [name]: value
//         }
//       }),
//       () => console.log(this.state.newPatient)
//     );
//   }
//   handleCheckBox(e) {
//     const newSelection = e.target.value;
//     let newSelectionArray;

//     if (this.state.newPatient.type.indexOf(newSelection) > -1) {
//       newSelectionArray = this.state.newPatient.type.filter(
//         s => s !== newSelection
//       );
//     } else {
//       newSelectionArray = [...this.state.newPatient.type, newSelection];
//     }

//     this.setState(prevState => ({
//         newPatient: { ...prevState.newPatient, type: newSelectionArray }
//     }));
//   }
  onSubmit = e => {
    e.preventDefault();
    // let PatientData = this.state.newPatient;
    // fetch("http://localhost:8082/patients ", {
    //   method: "POST",
    //   body: JSON.stringify(PatientData),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }
    // }).then(response => {
    //   response.json().then(data => {
    //     console.log("Successful" + data);
    //   });
    // });

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
      .post('http://localhost:8082/patients', data)
      .then(res => {
        this.setState({
          frstNm: '',
          mddlNm: '',
          lstNm: '',
          gndr: '',
          phnNm: '',
          dob: '',
          email: '',
          type: ''
        })
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log("Error in Patient Registration!");
      })
  };
  render() {
    return (
      <div className="topspacing">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h5>Register Patient</h5>

              <form noValidate onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className='form-group'>
                      <input
                        type='text'
                        name='frstNm'
                        className='form-control'
                        placeholder="First Name"
                        value={this.state.frstNm}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className='form-group'>
                      <input
                        type='text'
                        name='mddlNm'
                        className='form-control'
                        placeholder="Middle Name"
                        value={this.state.mddlNm}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className='form-group'>
                    <input
                        type='text'
                        name='lstNm'
                        className='form-control'
                        placeholder="Last Name"
                        value={this.state.lstNm}
                        onChange={this.onChange}
                      />
                    {/* <Input
                        inputType={"text"}
                        name={"lstNm"}
                        value={this.state.lstNm}
                        placeholder={"Last Name"}
                        onChange={this.onChange}
                        /> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className='form-group'>
                      <div className="form-check float-left">
                        <input className="form-check-input" type="radio" name="gndr"
                          value="Male"
                          checked={this.state.gndr === "Male"}
                          onChange={this.onChange} />
                        <label className="form-check-label" for="male">
                          Male
                              </label>
                      </div>
                      <div className="form-check float-left">
                        <input className="form-check-input" type="radio" name="gndr"
                          value="Female"
                          checked={this.state.gndr === "Female"}
                          onChange={this.onChange} />
                        <label className="form-check-label" for="female">
                          Female
                          </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className='form-group'>
                    <input
                        type='text'
                        name='lstNm'
                        className='form-control'
                        placeholder="Phone Number"
                        value={this.state.phnNm}
                        onChange={this.onChange}
                      />
                     {/* <Input
                        inputType={"number"}
                        name={"phnNm"}
                        value={this.state.phnNm}
                        placeholder={"Phone Number"}
                        onChange={this.onChange}
                        /> */}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className='form-group'>
                      <input
                        type='date'
                        name='dob'
                        placeholder="Date of Birth"
                        className='form-control'
                        value={this.state.dob}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className='form-group'>
                    {/* <Input
                        inputType={"email"}
                        name={"email"}
                        value={this.state.email}
                        placeholder={"Email Address"}
                        onChange={this.onChange}
                        /> */}
                        <input
                        type='text'
                        name='email'
                        className='form-control'
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className='form-group'>
                      <label htmlFor="type">Type</label> <br />
                      {/* <CheckBox
                        title={"type"}
                        name={"type"}
                        options={this.state.typeOptions}
                        selectedOptions={this.state.type}
                        handleChange={this.handleCheckBox}
                        /> */}
                      <div className="form-check float-left">
                        <input className="form-check-input" type="radio" name="type"
                          value="Direct"
                          checked={this.state.type === "Direct"}
                          onChange={this.onChange}
                        />
                        <label className="form-check-label" for="direct">
                          Direct </label>
                      </div>
                      <div className="form-check float-left">
                        <input className="form-check-input" type="radio" name="type"
                          value="Referral"
                          checked={this.state.type === "Referral"}
                          onChange={this.onChange} />
                        <label className="form-check-label" for="referral">
                          Referral
                                </label>
                      </div>
                      <div className="form-check float-left">
                        <input className="form-check-input" type="radio" name="type"
                          value="Practo"
                          checked={this.state.type === "Practo"}
                          onChange={this.onChange} />
                        <label className="form-check-label" for="practo">
                          Practo
                                </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2  float-right">
                  <input
                    type="submit"
                    className="btn btn-outline-success btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    )
  }
}
export default RegisterPage;