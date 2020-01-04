import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import HomePage from './views/HomePage';
import Header from './components/header';
import Footer from './components/footer';
import ProfilePage from '././views/DoctorProfile/ProfilePage';
import RegisterPage from '././views/PatientRegister/RegisterPage';
import AddInfo from '././views/PatientAdditionalInfo/AddInfo';
import Patients from './views/Patients';
import AddDetails from './views/Consultaion/AddDetails';
import BookAppointment from './views/Appointment/BookAppointment';
import Appointments from './views/Appointment/Appointments';

class App extends Component {
  render() {
    return (
       <Router>
       <Header />
        <div>
          <Route exact path='/' component={HomePage} />
          <Route path='/doctors' component={ProfilePage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/patientInfo' component={AddInfo} />
           <Route path='/patients' component={Patients} />
           <Route path='/consultaion' component={AddDetails} />
           <Route path="/bookAppointments" component={BookAppointment} />
           <Route path="/appointments" component={Appointments} />
          {/* <Route path='/create-book' component={CreateBook} />
          <Route path='/edit-book/:id' component={UpdateBookInfo} />
          <Route path='/show-book/:id' component={ShowBookDetails} /> */}
        </div>
        {/* <Footer /> */}
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
