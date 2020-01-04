import React, { Component} from 'react';
import Logo from '../assets/images/logo.png';
import '../index.scss';
import axios from "axios";

class Header extends Component {
    constructor(){
        super();
        this.state ={
            query: '',
            results: []
        }
    }
     getInfo = () => {
    axios.get("http://139.59.3.138:8082/patients/")
      .then(({ data }) => {
        this.setState({
          results: data // MusicGraph returns an object named data, 
                             // as does axios. So... data.data                             
        })
      })
  }
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } 
    })
  }
    render() {
        return (
            <div className="headerWrap float-left">
                <div className="col-md-12">
                     <div className="col-md-2 imgWrap float-left">
                     <a href="/">
                     <img src={Logo} alt="company logo"/>
                     </a>
                    </div>
                 <div className="col-md-8 float-left">
                    <h3 className="text-center"> SurgiDerma</h3>
                </div>
                 <div className="col-md-2 float-left">
                 <form>
       <input className="form-control"
         placeholder="Search Patients"
         ref={input => this.search = input}
         onChange={this.handleInputChange}
       />
       </form>
                </div>
                </div>

            </div>
        )
    }

}

export default Header;