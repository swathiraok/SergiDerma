const mongoos=require('mongoose');


const ClinicHolySchema=new mongoos.Schema({
    clinId:{
        type:String,
        require:true
    },
    dt:{
        type:String,
        require:true
    },
    hType:{
        type:JSON,
        require:true
    }
},{
    timestamps:true
});
module.exports=mongoos.model('ClinicHolyday',ClinicHolySchema)