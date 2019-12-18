const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  dateOfBirth:{
    type:Date,
    default: Date.now
  },
  dateOfJoining:{
    type:Date,
    default: Date.now
  }

});

module.exports = Doctor = mongoose.model('doctor', DoctorSchema);