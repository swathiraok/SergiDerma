import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import HomePage from './views/HomePage';
import Header from './components/header';
import Footer from './components/footer';
import ProfilePage from '././views/DoctorProfile/ProfilePage';
import RegisterPage from '././views/PatientRegister/RegisterPage';
import AddBasicInfo from '././views/PatientBasicInfo/AddBasicInfo';
import Patients from './views/Patients';

class App extends Component {
  render() {
    return (
       <Router>
       <Header />
        <div>
          <Route exact path='/' component={HomePage} />
          <Route path='/doctors' component={ProfilePage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/basicInfo' component={AddBasicInfo} />
           <Route path='/patients' component={Patients} />
          {/* <Route path='/create-book' component={CreateBook} />
          <Route path='/edit-book/:id' component={UpdateBookInfo} />
          <Route path='/show-book/:id' component={ShowBookDetails} /> */}
        </div>
        <Footer />
      </Router>
    // //  <div>
    // //   <Header/>
    //   <Router>
    //   <Header/>
    //   <div>
    //       <Route exact path='/home' component={HomePage} />
    //       {/* <Route exact path='/doctors' component={ProfilePage} /> */}
    //       {/* <Route path='/create-book' component={CreateBook} />
    //       <Route path='/edit-book/:id' component={UpdateBookInfo} />
    //       <Route path='/show-book/:id' component={ShowBookDetails} /> */}
    //     </div>
    //   </Router>
    );
  }
}

export default App;
