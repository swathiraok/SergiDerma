import React, { Component } from "react";
import Logo from '../assets/images/finch_logo.png';

class Footer extends Component {
  render() {
    return (
        <div className="footerWrap">
          <div className="col-md-12">
            <div className="col-md-10 float-left">
            <div className="copyright">
                <span>Copyright © 2019, SurgiDerma. </span>
                <span>All rights reserved.</span>
              </div></div>
            <div className="col-md-2 float-right">
                <img src={Logo} alt="finch logo"/>
            </div>
          </div>
        </div>
    );
  }
}

export default Footer;
