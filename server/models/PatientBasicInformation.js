const mongoose=require('mongoose');

const PatientBasicInformationSchema=new mongoose.Schema({
    ptId:{
        type:String,
        required:true
    },
    ptHeight:{
        type:String,
        required:true
    },
    ptWeight:{
        type:String,
        required:true
    },
    ptBMI:{
        type:String,
        required:true
    },
    ptBloodGroup:{
        type:String,
        required:true
    },
    ptInsurance:{
        type:JSON,
        required:true
    },
    ptAllergies:{
        type:JSON,
        required:true
    },
    ptAnyOperation:{
        type:String,
        required:true
    },
    ptCurrentMedications:{
        type:String,
        required:true
    },
    ptHabit:{
        type:JSON,
        required:true
    },
    ptNote:{
        type:String
    },
    updated_date: {
        type: Date,
        default: Date.now
      }
    
});
module.exports=mongoose.model('patientBasicInformation',PatientBasicInformationSchema);