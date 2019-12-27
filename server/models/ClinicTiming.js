const mongoos=require('mongoose');


const ClinicTimingSchema=new mongoos.Schema({
    ClinId:{
        type:String,
        require:true
    },
    day:{
        type:String,
        require:true
    },
    Tmng:{
        type:JSON,
        require:true
    }
},{
    timestamps:true
});
module.exports=mongoos.model('ClinicTiming',ClinicTimingSchema)