import React, { Component} from 'react';
import Logo from '../assets/images/logo.png';
import '../index.scss';

class Header extends Component {
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
                </div>
                </div>

            </div>
        )
    }

}

export default Header;