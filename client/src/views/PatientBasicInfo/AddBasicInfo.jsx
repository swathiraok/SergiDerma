import React, { Component } from "react";
import axios from "axios";
import "index.scss";
import { allergies } from "../../data/allergies.js";
// import { required } from "../../utils/reduxFormValiadtion.js";

class AddBasicInfo extends Component {
  constructor() {
    console.log("allergies" + allergies);
    super();
    this.state = {
      ptHeight: "",
      ptWeight: "",
      ptBMI: "",
      ptBloodGroup: "",
      prdrNm: "",
      plcyNo: "",
      plcyType: "",
      valdUpTo: "",
      ptAllergies: [],
      ptAnyOperation: "",
      ptCurrentMedications: "",
      exercise: "",
      eating_following_a_diet: "",
      alcohol_consumption: "",
      caffeine_consumption: "",
      do_you_smoke: "",
      ptNote: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onToggle(index, e) {
    let newItems = allergies.slice();
    newItems[index].checked = !newItems[index].checked;
    console.log("newItems are:::" + newItems);
    this.setState({
      ptAllergies: newItems
    });
  }

  onSubmitData = e => {
    console.log("inside submit");
    e.preventDefault();
    const data = {
      ptId: "1234",
      ptHeight: this.state.ptHeight,
      ptWeight: this.state.ptWeight,
      ptBMI: this.state.ptBMI,
      ptBloodGroup: this.state.ptBloodGroup,
      ptInsurance: {
        prdrNm: this.state.prdrNm,
        plcyNo: this.state.plcyNo,
        plcyType: this.state.plcyType,
        valdUpTo: this.state.valdUpTo
      },
      ptAllergies: this.state.ptAllergies,
      ptAnyOperation: this.state.ptAnyOperation,
      ptCurrentMedications: this.state.ptCurrentMedications,
      ptHabit: {
        exercise: this.state.exercise,
        eating_following_a_diet: this.state.eating_following_a_diet,
        alcohol_consumption: this.state.alcohol_consumption,
        caffeine_consumption: this.state.caffeine_consumption,
        do_you_smoke: this.state.do_you_smoke
      },
      ptNote: this.state.ptNote
    };

    axios
      .post("http://139.59.3.138:8082/patientBasicInfo/", data)
      .then(res => {
        this.setState({
          ptId: "1234",
          ptHeight: "",
          ptWeight: "",
          ptBMI: "",
          ptBloodGroup: "",
          ptInsurance: {
            prdrNm: "",
            plcyNo: "",
            plcyType: "",
            valdUpTo: ""
          },
          ptAllergies: [],
          ptAnyOperation: "",
          ptCurrentMedications: "",
          ptHabit: {
            exercise: "",
            eating_following_a_diet: "",
            alcohol_consumption: "",
            caffeine_consumption: "",
            do_you_smoke: ""
          },
          ptNote: ""
        });
        alert("Patient basic information saved successfully");
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error in saving Patient information!");
      });
  };

  render() {
    return (
      <div className="topspacing">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h5>Patient Basic Information details</h5>

              <form onSubmit={this.onSubmitData}>
                <div>
                  <h4>Physical Information</h4>
                </div>
                <div className="col-md-4 float-left">
                  <div className="form-group">
                    <input
                      type="text"
                      name="ptHeight"
                      className="form-control"
                      placeholder="Height"
                      value={this.state.ptHeight}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 float-left">
                  <div className="form-group">
                    <input
                      type="text"
                      name="ptWeight"
                      className="form-control"
                      placeholder="Weight"
                      value={this.state.ptWeight}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 float-left">
                  <div className="form-group">
                    <input
                      type="text"
                      name="ptBMI"
                      className="form-control"
                      placeholder="BMI"
                      value={this.state.ptBMI}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="col-md-4 float-left">
                  <div className="form-group">
                    <input
                      type="text"
                      name="ptBloodGroup"
                      className="form-control"
                      placeholder="Blood Group"
                      value={this.state.ptBloodGroup}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div>
                    <h4>Insurance Information</h4>
                  </div>
                  <div className="col-md-4 float-left">
                    <div className="form-group">
                      <input
                        type="text"
                        name="prdrNm"
                        className="form-control"
                        placeholder="Insurance Provider Name"
                        value={this.state.prdrNm}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 float-left">
                    <div className="form-group">
                      <input
                        type="text"
                        name="plcyNo"
                        placeholder="Policy Number"
                        className="form-control"
                        value={this.state.plcyNo}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 float-left">
                    <div className="form-group">
                      <input
                        type="text"
                        name="plcyType"
                        className="form-control"
                        placeholder="Policy Type"
                        value={this.state.plcyType}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 float-left">
                  <div className="form-group">
                    <input
                      type="date"
                      name="valdUpTo"
                      className="form-control"
                      placeholder="Valid Upto"
                      value={this.state.valdUpTo}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="col-md-12 float-left">
                  <div>
                    <h4>Medical History</h4>
                  </div>
                  <div className="checkboxgroup">
                    <div className="form-group">
                      <ul>
                        {allergies.map((item, i) => (
                          <li key={i}>
                            {item.name}
                            <input
                              type="checkbox"
                              onChange={this.onToggle.bind(this, i)}
                              value={item.value}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-4 float-left">
                    <div className="form-group">
                      <textarea
                        name="ptAnyOperation"
                        className="form-control"
                        placeholder="List any operation"
                        value={this.state.ptAnyOperation}
                        onChange={this.onChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-4 float-left">
                    <div className="form-group">
                      <textarea
                        name="ptCurrentMedications"
                        className="form-control"
                        placeholder="Current Medications"
                        value={this.state.ptCurrentMedications}
                        onChange={this.onChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 float-left">
                  <div className="form-group">
                    <h4>Exercise</h4> <br />
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exercise"
                        value="Never"
                        checked={this.state.exercise === "Never"}
                        onChange={this.onChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="never">
                        Never
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exercise"
                        value="1-2 days"
                        checked={this.state.exercise === "1-2 days"}
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="1to2days">
                        1-2 days
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exercise"
                        value="3-4 days"
                        checked={this.state.exercise === "3-4 days"}
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="3to4days">
                        3-4 days
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exercise"
                        value="5+ days"
                        checked={this.state.exercise === "5+ days"}
                        onChange={this.onChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="5days">
                        5+ days
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 float-left">
                  <div className="form-group">
                    <h4>Eating following a diet</h4> <br />
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="eating_following_a_diet"
                        value="I have a loose diet"
                        checked={
                          this.state.eating_following_a_diet ===
                          "I have a loose diet"
                        }
                        onChange={this.onChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="looseDiet">
                        I have a loose diet
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="eating_following_a_diet"
                        value="I have a strict diet"
                        checked={
                          this.state.eating_following_a_diet ===
                          "I have a strict diet"
                        }
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="strictDiet">
                        I have a strict diet
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="eating_following_a_diet"
                        value="I don't have a diet plan"
                        checked={
                          this.state.eating_following_a_diet ===
                          "I don't have a diet plan"
                        }
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="noDiet">
                        I don't have a diet plan
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 float-left">
                  <div className="form-group">
                    <h4>Alcohol Consumption</h4> <br />
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="alcohol_consumption"
                        value="I don't drink"
                        checked={
                          this.state.alcohol_consumption === "I don't drink"
                        }
                        onChange={this.onChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="dontDrink">
                        I don't drink
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="alcohol_consumption"
                        value="1-2 glasses/day"
                        checked={
                          this.state.alcohol_consumption === "1-2 glasses/day"
                        }
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="1to2glasses">
                        1-2 glasses/day
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="alcohol_consumption"
                        value="3-4 glasses/day"
                        checked={
                          this.state.alcohol_consumption === "3-4 glasses/day"
                        }
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="3to4glasses">
                        3-4 glasses/day
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="alcohol_consumption"
                        value="5+ glasses/day"
                        checked={
                          this.state.alcohol_consumption === "5+ glasses/day"
                        }
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="5glasses">
                        5+ glasses/day
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 float-left">
                  <div className="form-group">
                    <h4>Caffeine Consumption</h4> <br />
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="caffeine_consumption"
                        value="I don't use caffeine"
                        checked={
                          this.state.caffeine_consumption ===
                          "I don't use caffeine"
                        }
                        onChange={this.onChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="noUse">
                        I don't use caffeine
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="caffeine_consumption"
                        value="1-2 cups/day"
                        checked={
                          this.state.caffeine_consumption === "1-2 cups/day"
                        }
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="1to2cups">
                        1-2 cups/day
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="caffeine_consumption"
                        value="3-4 cups/day"
                        checked={
                          this.state.caffeine_consumption === "3-4 cups/day"
                        }
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="3to4cups">
                        3-4 cups/day
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="caffeine_consumption"
                        value="5+ cups/day"
                        checked={
                          this.state.caffeine_consumption === "5+ cups/day"
                        }
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="5cups">
                        5+ cups/day
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 float-left">
                  <div className="form-group">
                    <h4>Do you smoke?</h4> <br />
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="do_you_smoke"
                        value="No"
                        checked={this.state.do_you_smoke === "No"}
                        onChange={this.onChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="no">
                        No
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="do_you_smoke"
                        value="0-1 pack/day"
                        checked={this.state.do_you_smoke === "0-1 pack/day"}
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="0to1pack">
                        0-1 pack/day
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="do_you_smoke"
                        value="1-2 packs/day"
                        checked={this.state.do_you_smoke === "1-2 packs/day"}
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="1to2packs">
                        1-2 packs/day
                      </label>
                    </div>
                    <div className="form-check float-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="do_you_smoke"
                        value="2+ packs/day"
                        checked={this.state.do_you_smoke === "2+ packs/day"}
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="2packs">
                        2+ packs/day
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      name="ptNote"
                      className="form-control"
                      placeholder="Include other comments regarding your Medical History"
                      value={this.state.ptNote}
                      onChange={this.onChange}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-2  float-right">
                    <input
                      type="submit"
                      className="btn btn-success btn-block"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddBasicInfo;
