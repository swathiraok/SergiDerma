
const mongoose = require('mongoose');
const shortId=require('short-id');
const generateId = require('nanoid/generate')
const nanoid = require('nanoid');
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
    updated_date: {
        type: Date,
        default: Date.now
      }
});

module.exports=mongoose.model('patient',PatientSchema);