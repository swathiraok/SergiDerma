import React, { Component } from "react";
import "../../index.scss";
import profileImg1 from "../../assets/images/ranganath.jpg";
import profileImg2 from "../../assets/images/sujaya.jpg";

class ProfilePage extends Component {
  render() {
    return (
      <div className="topspacing">
        <div className="container">
          <h3>Doctor's Profile</h3>
          <div className="profileWrap float-left">
            <div className="col-md-12 row">
              <div className="col-md-3">
                <img src={profileImg1} alt="Ranganath" />
              </div>
              <div className="col-md-9">
                <h5>Dr. Ranganath v s </h5>
                <h6>
                  MCh - Plastic & Reconstructive Surgery, FNB - Hand and
                  Microsurgery, MBBS, MS - General Surgery
                </h6>
                <p className="specialization">
                  Plastic Surgeon, 14 Years Experience Overall (4 years as
                  specialist)
                </p>
                <p>
                  Dr.Ranganath V S is a board-certified Plastic, Reconstructive
                  & Cosmetic Surgeon. He specializes in facial, breast, and body
                  Cosmetic and Reconstructive Surgery for women and men. He is a
                  leading authority on Aesthetics, Anti-aging, & Beauty
                </p>
              </div>
            </div>
          </div>
          <div className="profileWrap float-left">
            <div className="col-md-12 row">
              <div className="col-md-3">
                <img src={profileImg2} alt="Sujaya" />
              </div>
              <div className="col-md-9">
                <h5>Dr. Sujaya S.N </h5>
                <h6>MBBS, DDVL</h6>
                <p className="specialization">
                  Dermatologist, Cosmetologist, Dermatosurgeon, Aesthetic
                  Dermatologist, 12 Years Experience Overall (11 years as
                  specialist)
                </p>
                <p>
                  Dr. Sujaya S.N. is a renowned Dermatologist, Dermato Surgeon
                  and Cosmetic Dermatologist practicing in Bangalore. she
                  completed MBBS from JJMC Davengere and here Dermatology degree
                  from prestigious Bangalore Medical College.
                </p>
                <p>
                  She completed Fellowship in Dermatosurgery from Bangalore
                  Medical College. She is practicing Dermatology from past 10
                  years in Bangalore and from past 5 years at Surgiderma
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
