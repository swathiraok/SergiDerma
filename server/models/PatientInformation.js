const mongoos = require('mongoose');


const PatientInformationSchema=new mongoos.Schema({
    ptntId:{
        type:String,
        require:true
    },
    ptntHeight:{
        type:String,
        require:true
    },
    ptntWeight:{
        type:String,
        require:true
    },
    ptntBMI:{
        type:String,
        require:true
    },
    ptntHealthIssue:{
        type:String,
        require:true
    },
    pntnHabit:{
        type:String,
        require:true
    },
    pntnInsurance:{
        type:String,
        require:true
    },
    updated_date: {
        type: Date,
        default: Date.now
      }

});
module.exports=mongoos.model('patientInformation',PatientInformationSchema);