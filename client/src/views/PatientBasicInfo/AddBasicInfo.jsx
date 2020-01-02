import React, { Component } from 'react';
import axios from 'axios';
// import 'index.scss';
import Checkbox from '../../components/Checkbox';
import { allergies } from "../../data/allergies.js";
// import Input from '../../components/Input';

// {
// 	"ptId":"12345",
//     "ptHeight":"5'2",
//     "ptWeight":"55",
//     "ptBMI":"43",
//     "ptHealthIssue":"aller",
//     "ptInsurance":{
//     	"sub_name":"abcd",
//         "sub_DOB":"12/12/2019",
//         "rel_to_sub":"father",
//         "emp_name":"unknow",
//         "emp_phone":"1234567890",
//         "occupation":"employee"},
//     "ptBloodGroup":"a",
//     "ptAllergies":[{
//     	"name":"Anemia"
//     },{
//     	"name":"Unknow"
//     }],
//     "ptAnyOperation":"yes",
//     "ptCurrentMedications":"dia",
//     "ptHabit":{
//     	"exercise":{
//     		"day":"never"
//     	},
//     	"eating_following_a_diet":{
//     		"diet":"i have a loose diet"
//     	},
//     	"alcohol_consumption":{
//     		"day":"i don't drink"
//     	},
//     	"caffeine_consumption":{
//     		"day":"1-2cup/day"
//     	},
//     	"do you smoke":{
//     		"day":"no"
//     	}
//     },
//     "ptNote":"kjsdk"
// }
class AddBasicInfo extends Component {
  constructor() {
    console.log('allergies' +allergies);
    super();
    this.state = {
            ptHeight: '',
            ptWeight: '',
            ptBMI: '',
            ptHealthIssue: '',
            ptInsurance: {
              sub_name:'',
              sub_DOB: '',
              rel_to_sub: '',
              emp_name: '',
              emp_phone: '',
              occupation: '',
              ptBloodGroup: ''
            },
            ptAllergies: [],
            ptAnyOperation: '',
            ptCurrentMedications: '',
            ptHabit: {
              exercise: '',
              eating_following_a_diet: '',
              alcohol_consumption: '',
              caffeine_consumption: '',
              do_you_smoke: ''
            },
            ptNote: '',
            checkedItems: new Map(),
        }
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }
  //  handleInput(e) {
  //    let value = e.target.value;
  //   let name = e.target.name;
  //   this.setState(
  //     prevState => ({
  //       newPatient: {
  //         ...prevState.newPatient,
  //         [name]: value
  //       }
  //     }),
  //     () => console.log(this.state.newPatient)
  //   );
  // }
  // handleCheckBox(e) {
  //   const newSelection = e.target.value;
  //   let newSelectionArray;

  //   if (this.state.newPatient.type.indexOf(newSelection) > -1) {
  //     newSelectionArray = this.state.newPatient.type.filter(
  //       s => s !== newSelection
  //     );
  //   } else {
  //     newSelectionArray = [...this.state.newPatient.type, newSelection];
  //   }

  //   this.setState(prevState => ({
  //       newPatient: { ...prevState.newPatient, type: newSelectionArray }
  //   }));
  // }
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

    // const data = {
    //   frstNm: this.state.frstNm,
    //   mddlNm: this.state.mddlNm,
    //   lstNm: this.state.lstNm,
    //   gndr: this.state.gndr,
    //   phnNm: this.state.phnNm,
    //   dob: this.state.dob,
    //   email: this.state.email,
    //   type: this.state.type
    // };

    // axios
    //   .post('http://localhost:8082/patients', data)
    //   .then(res => {
    //     this.setState({
    //       frstNm: '',
    //       mddlNm: '',
    //       lstNm: '',
    //       gndr: '',
    //       phnNm: '',
    //       dob: '',
    //       email: '',
    //       type: ''
    //     })
    //     this.props.history.push('/home');
    //   })
    //   .catch(err => {
    //     console.log("Error in Patient Registration!");
    //   })
  };
  render() {
    
    return (
      <div className="topspacing">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h5>Patient Basic Information details</h5>

              <form noValidate onSubmit={this.onSubmit}>
                
                  <div><h4>Physical Information</h4></div>
                  <div className="col-md-4 float-left">
                    <div className='form-group'>
                      <input
                        type='text'
                        name='ptHeight'
                        className='form-control'
                        placeholder="Height"
                        value={this.state.ptHeight}
                        onChange={this.onChange}
                      />
                       {/* <Input
                        inputType={"text"}
                        name={"frstNm"}
                        value={this.state.newPatient.frstNm}
                        placeholder={"First Name"}
                        handleChange={this.handleInput}
                        /> */}
                    </div>
                  </div>
                  <div className="col-md-4 float-left">
                    <div className='form-group'>
                      <input
                        type='text'
                        name='ptWeight'
                        className='form-control'
                        placeholder="Weight"
                        value={this.state.ptWeight}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 float-left">
                    <div className='form-group'>
                    <input
                        type='text'
                        name='ptBMI'
                        className='form-control'
                        placeholder="BMI"
                        value={this.state.ptBMI}
                        onChange={this.onChange}
                      />
                  
                    </div>
                  </div>
                
               
                  <div className="col-md-4">
                    <div className='form-group'>
                    <input
                        type='text'
                        name='ptBloodGroup'
                        className='form-control'
                        placeholder="Blood Group"
                        value={this.state.ptBloodGroup}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                
                
                <div><h4>Insurance Information</h4></div>
                  <div className="col-md-4 float-left">
                    <div className='form-group'>
                       <input
                        type='text'
                        name='sub_name'
                        className='form-control'
                        placeholder="Subscriber Name"
                        value={this.state.ptInsurance.sub_name}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 float-left">
                    <div className='form-group'>
                     <input
                        type='date'
                        name='sub_DOB'
                        placeholder="Subscriber DOB"
                        className='form-control'
                        value={this.state.ptInsurance.sub_DOB}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 float-left">
                    <div className='form-group'>
                       <input
                        type='text'
                        name='rel_to_sub'
                        className='form-control'
                        placeholder="Relationship to subscriber"
                        value={this.state.ptInsurance.rel_to_sub}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>

                   <div className="col-md-4 float-left">
                    <div className='form-group'>
                       <input
                        type='text'
                        name='emp_name'
                        className='form-control'
                        placeholder="Employee Name"
                        value={this.state.ptInsurance.emp_name}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>

                  
                  
                     <div className="col-md-4 float-left">
                    <div className='form-group'>
                    <input
                        type='text'
                        name='emp_phone'
                        className='form-control'
                        placeholder="Employer phone no"
                        value={this.state.ptInsurance.emp_phone}
                        onChange={this.onChange}
                      />
                    </div>
                    </div>
                     <div className="col-md-4 float-left">
                    <div className='form-group'>
                    <input
                        type='text'
                        name='occupation'
                        className='form-control'
                        placeholder="Occupation"
                        value={this.state.ptInsurance.occupation}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>

                  
                    <div className="col-md-4 float-left">
                      <div className='form-group'>
                        <input
                          type='text'
                          name='ptBloodGroup'
                          className='form-control'
                          placeholder="Blood Group"
                          value={this.state.ptInsurance.ptBloodGroup}
                          onChange={this.onChange}
                        />
                    </div>
                    </div>

                  

                  {/* <div className="row"> */}
                  <div><h4>Medical History</h4></div>
                    <div className="col-md-12 float-left checkboxgroup">
                          <div className="form-group col-md-12">
                           {/* <div className="col-md-2"> */}
                             <React.Fragment>{allergies.map(item => (
            <label key={item.key}>
              {item.name}
              <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
            </label>
          ))
        }
      </React.Fragment>
      {/* </div> */}
                          {/* </div> */}
                        </div>
                  </div>

                   
                </form>
                
                </div>
                <div className="col-md-12">
                   <div className="col-md-2  float-right">
                  <input
                    type="submit"
                    className="btn btn-success btn-block"
                  />
                </div>
                </div>
                </div>
                </div>
                </div>
      //           // </div>
                
      //           {/* <div className="row">
      //             <div className="col-md-4">
      //               <div className='form-group'>
      //                  <input
      //                   type='text'
      //                   name='emp_name'
      //                   className='form-control'
      //                   placeholder="Employee Name"
      //                   value={this.state.ptInsurance.emp_name}
      //                   onChange={this.onChange}
      //                 />
      //               </div>
      //               </div>
      //               <div className="col-md-4">
      //               <div className='form-group'>
      //               <input
      //                   type='text'
      //                   name='emp_phone'
      //                   className='form-control'
      //                   placeholder="Employer phone no"
      //                   value={this.state.ptInsurance.emp_phone}
      //                   onChange={this.onChange}
      //                 />
      //               </div>
      //               </div>
      //               <div className="col-md-4">
      //               <div className='form-group'>
      //               <input
      //                   type='text'
      //                   name='occupation'
      //                   className='form-control'
      //                   placeholder="Occupation"
      //                   value={this.state.ptInsurance.occupation}
      //                   onChange={this.onChange}
      //                 />
      //               </div>
      //             </div>
      //             </div>
      //             <div className="row">
      //               <div className="col-md-4">
      //                 <div className='form-group'>
      //                   <input
      //                     type='text'
      //                     name='ptBloodGroup'
      //                     className='form-control'
      //                     placeholder="Blood Group"
      //                     value={this.state.ptInsurance.ptBloodGroup}
      //                     onChange={this.onChange}
      //                   />
      //               </div>
      //               </div>
      //               </div>
      //               <div className="row">
      //                 <div className="col-md-4">
      //                     <div className="form-group">
      //                       <React.Fragment>{allergies.map(item => (
      //       <label key={item.key}>
      //         {item.name}
      //         <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
      //       </label>
      //     ))
      //   }
      // </React.Fragment>

      //                     </div>
      //                 </div>
      //               </div>
      //             </div>
      //           </div> */}
               
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    
    )
  }
}
export default AddBasicInfo;