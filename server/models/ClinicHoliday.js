const mongoos=require('mongoose');


const ClinicHolySchema=new mongoos.Schema({
    ClinId:{
        type:String,
        require:true
    },
    dt:{
        type:String,
        require:true
    },
    Htype:{
        type:JSON,
        require:true
    }
},{
    timestamps:true
});
module.exports=mongoos.model('ClinicHolyday',ClinicHolySchema)