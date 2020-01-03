const mongoose=require('mongoose');

const PatientBasicInformationSchema=new mongoose.Schema({
    ptId:{
        type:String,
        required:true
    },
    ptHeight:{
        type:String
    },
    ptWeight:{
        type:String
    },
    ptBMI:{
        type:String
    },
    ptBloodGroup:{
        type:String
    },
    ptInsurance:{
        type:JSON
    },
    ptAllergies:{
        type:JSON
    },
    ptAnyOperation:{
        type:String
    },
    ptCurrentMedications:{
        type:String
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