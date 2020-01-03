const mongoos=require('mongoose');


const ClinicTimingSchema=new mongoos.Schema({
    clinId:{
        type:String,
        require:true
    },
    day:{
        type:String,
        require:true
    },
    tmng:{
        type:JSON,
        require:true
    }
},{
    timestamps:true
});
module.exports=mongoos.model('ClinicTiming',ClinicTimingSchema)