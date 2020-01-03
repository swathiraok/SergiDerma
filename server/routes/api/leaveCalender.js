const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

//load patientBasicInfor model
const LeaveCalender = require("../../models/LeaveCalender");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("clinicAdd route testing!"));



router.post("/addLeaveCalinder/",[
    check('dId','LeaveCalinder Doctor is required!!').not().isEmpty(),
    check('staffcd','LeaveCalinder  staff code is required!!').not().isEmpty(),
    check('dt','LeaveCalinder day is required!!').not().isEmpty()
],
async function(req,res){
    //validation check
    const errors=validationResult(req);
    console.info(req.body);
    console.info("valid error",errors);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        LeaveCalender.create(req.body)
        .then(result => {
            console.info("result",result);
            res.json({id:result.dId,
                                   message: "ClinicAddress added successfully..",
                                   status:"200" })
                                })
        .catch(err =>res.status(500).json(err))
    
      
    }       
});

//@route PUT api/Leave calender
//@description update leave calender
//public access
/* 
    parameter id:doctor id
*/
router.put("/updateLeaveCalinder", async function(req,res) {
    
  await LeaveCalender.findOneAndUpdate({dId:req.query.id},req.body,{new: true}, function(err,result) {
      console.info("error",err);
      console.info("result",result);
       if(err)
       res.status(500).json(err);
       else
       if(result==null)
       res.status(404).json({error:"Unable to found"})
       else
       res.json(result)
   });
});


//@rounte GET api/leave calender
//@description get all leave calender
// public access
/* parameter
    id:1111 mandotary field
    skips:1, //option
    limits:1 //option
*/
router.get("/getleaveCalender",(req,res) =>{

    let skipPage=Number(req.query.page);
    let limitPage=Number(req.query.size);

    console.info("skip",skipPage)
    console.info("query",req.query)
    LeaveCalender.find({dId:req.query.id},function(err,result){
        console.info("error",err);
        console.info("result",result);
        if(err)
        res.status(500).json(err)
        else
        if(result.length==0)
        res.status(400).json({error:"Unable to find"})
        else
        res.json(result)
    }).skip(skipPage).limit(limitPage)
});




module.exports=router;