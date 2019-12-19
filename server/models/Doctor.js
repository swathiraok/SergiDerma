const mongoose = require('mongoose');
 
 
const generateId = require('nanoid/generate')
const nanoid = require('nanoid');

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
  },
  address:{
      type :String,
      required:true
  },
  pinCode:{
      type:String,
      required:true
  },
  country:{
      type:String,
      required:true
  },
  gender:{
      type:String,
      required:true
  },
  doctorId:{
      type:String,
      default:() =>"DKN1"+nanoid(6),
      require:true
      
  }
});

module.exports = Doctor = mongoose.model('branchCodeMaster', DoctorSchema);