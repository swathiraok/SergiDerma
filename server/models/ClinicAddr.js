const mongoos=require('mongoose');
const nanoid = require('nanoid');



const ClinicAddrSchema=new mongoos.Schema({
    clinId:{
        type:String,
        default:() =>"HKN1"+nanoid(6),
        require:true
    },
    addrLn1:{
        type:String,
        require:true
    },
    addrLn2:{
        type:String
    },
    addrLn3:{
        type:String
    },
    addrLn4:{
        type:String
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    zipCode:{
        type:String,
        require:true
    },
    cntactDtls:{
        primPhnNum:{
            type:Number,
            require:true
        },
        scndPhnNum:{
            type:Number
        },
        emlAddr:{
            type:String,
            require:true
        },
        website:{
            type:String
        }
    },
    locdtls:{
        type:JSON,
        require:true
    }
},{
    timestamps:true
});
module.exports=mongoos.model('ClinicAddr',ClinicAddrSchema);