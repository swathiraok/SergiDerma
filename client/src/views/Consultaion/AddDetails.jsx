import React, { Component } from 'react';

import Tabs from '../../components/Tabs/Tabs';

// require('./styles.css');

class AddDetails extends Component {
    render() {
  return (
    <div className="topspacing container">
        <h5>Consultaion Summary</h5>
      <Tabs>
        <div label="Examinations">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Diagnosis">
          After &apos;while, <em>Crocodile</em>!
        </div>
        <div label="Prescriptions">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
        <div label="Investigations">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
        <div label="Procedures">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
        <div label="Instructions">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
        <div label="Notes">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
        <div label="Sections">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
        <div label="Print Settings">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs>
    </div>
  );
 }
}

export default AddDetails;