
const mongoose = require('mongoose');
const shortId=require('short-id');

const PatientSchema=new mongoose.Schema({
    patientId:{
        type:String,
        default:shortId.generate,
        require:true
    },
    patienFirstName:{
        type:String,
        require:true
    },
    patientLastName:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    email:{
        type:String
    },
    typeOfWalkin:{
        type:String,
        require:true
    },
    aligment:{
        type:String,
        require:true
    },
    doctor:{
        type:String
    },
    updated_date: {
        type: Date,
        default: Date.now
      }
});

module.exports=mongoose.model('patient',PatientSchema);