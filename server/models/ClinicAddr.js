const mongoos=require('mongoose');
const nanoid = require('nanoid');



const ClinicAddrSchema=new mongoos.Schema({
    ClinId:{
        type:String,
        default:() =>"HKN1"+nanoid(6),
        require:true
    },
    AddrLn1:{
        type:String,
        require:true
    },
    AddrLn2:{
        type:String
    },
    AddrLn3:{
        type:String
    },
    AddrLn4:{
        type:String
    },
    City:{
        type:String,
        require:true
    },
    State:{
        type:String,
        require:true
    },
    Country:{
        type:String,
        require:true
    },
    ZipCode:{
        type:String,
        require:true
    },
    cntactDtls:{
        PrimPhnNum:{
            type:Number,
            require:true
        },
        ScndPhnNum:{
            type:Number
        },
        EmlAddr:{
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