
const mongoose = require('mongoose');
const shortId=require('short-id');
const generateId = require('nanoid/generate')
const nanoid = require('nanoid');




const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;

const bt=require('dotenv').config();
const PatientSchema=new mongoose.Schema({
    ptntId:{
        type:String,
        default:() =>"PKN1"+nanoid(6),
        require:true
    },
    frstNm:{
        type:String,
        require:true
    },
    mddlNm:{
        type:String,
        require:true
    },
    lstNm:{
        type:String,
        require:true
    },
    gndr:{
        type:String,
        require:true
    },
    PhnNm:{
        type:Number,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    email:{
        type:String
    },

    type:{
        type:String,
        require:true
    },
    patientBasicInform:
        {    type: mongoose.Schema.Types.ObjectId,
             ref:'PatientBasicInformation'
        }       
    },
    {
    timestamps:true
});


let keyString = "hpXa6pTJOWDAClC/J6POVTjvJpMIiPAMQiTMjBrcOGw="
PatientSchema.plugin(mongooseFieldEncryption, { fields: ["email", "frstNm","lstNm","PhnNm"], secret: keyString,saltGenerator: function(secret) {
    return "1234567890123456"; // should ideally use the secret to return a string of length 16
  } });
 
const Patient=module.exports=mongoose.model('Patient',PatientSchema);



