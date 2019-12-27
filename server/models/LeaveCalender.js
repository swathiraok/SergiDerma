const mongoos=require('mongoose');


const LeaveCalenderSchema=new mongoos.Schema({
    dId:{
        type:String,
        require:true
    },
    staffcd:{
        type:String,
        require:true
    },
    dt:{
        type:JSON,
        require:true
    }
},{
    timestamps:true
});
module.exports=mongoos.model('LeaveCalender',LeaveCalenderSchema)