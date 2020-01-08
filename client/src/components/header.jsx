import React, { Component } from "react";
import Logo from "../assets/images/surgidermaLogo.jfif";
import UserImage from "../assets/images/user_profile.png";
import "../index.scss";
import axios from "axios";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl } from 'react-bootstrap';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      results: []
    };
  }
  getInfo = () => {
    axios.get("http://139.59.3.138:8082/patients/").then(({ data }) => {
      this.setState({
        results: data
      });
    });
  };
  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        }
      }
    );
  };
  render() {
    return (
      <div className="headerWrap container-fluid">
        <div className="row">
          <div className="col-2 col-md-2 imgWrap">
            <a href="/">
              <img src={Logo} alt="company logo" />
            </a>
          </div>
          <div className="col-7 col-md-8">
            <h3 className="text-center"> SurgiDerma</h3>
          </div>
          <div className="col-3 col-md-2 userNavWrap
          ">
            <Navbar expand="lg">
              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              <Navbar id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown title={
                     <div className="pull-left">
                        <img className="thumbnail-image" 
                            src={UserImage} 
                            alt="user pic"
                        />
                    </div>
                  }id="basic-nav-dropdown">
                    <NavDropdown.Item href="#">
                      User Name
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar>
            </Navbar>
          </div>
          {/* <div className="col-3 col-md-2">
            <form>
              <input
                className="form-control"
                placeholder="Search"
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
            </form>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Header;
