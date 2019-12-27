const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

//load patientBasicInfor model
const ClinicTiming = require("../../models/ClinicTiming");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("clinicAdd route testing!"));



router.post("/addClinicTiming/",[
    check('ClinId','clinic ClinId is required!!').not().isEmpty(),
    check('day','clinic timing day is required!!').not().isEmpty(),
    check('Tmng','clinic timing is required!!').not().isEmpty()
],
async function(req,res){
    //validation check
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
    
        let totalDay= ClinicTiming.find();
        /* check email and phone already exit in db */
        console.log("lenght",(await totalDay).length);
        if((await totalDay).length >= 7){
            console.log("lenght size",totalDay.length);
            res.json({message:"not allow  more than seven days timing"})
        }else{
          ClinicTiming.create(req.body)
        .then(result => res.json({id:result.ClinId,
                                   message: "ClinicAddress added successfully..",
                                   status:"200" }))
        .catch(err =>res.status(500).json(err))
        }
      
    }       
});

//@route PUT api/ClinicTiming
//@description update clinic timing 
//public access
router.put("/updateClinicTiming", async function(req,res) {

  await ClinicTiming.findOneAndUpdate({day:req.query.day},req.body,{new: true}, function(err,result) {
       if(err)
       res.status(500).json(err);
       else
       if(result==null)
       res.status(404).json({error:"Unable to found"})
       else
       res.json(result)
   });
});


//@rounte GET api/ClinicTiming
//@description get all Clinic timing
// public access
/* parameter
    id:1111 mandotary field
    skips:1, //option
    limits:1 //option
*/
router.get("/getClinicTiming",(req,res) =>{

    let skipPage=Number(req.query.page);
    let limitPage=Number(req.query.size);

    console.log("skip",skipPage)
    console.log("query",req.query)
    ClinicTiming.find({ClinId:req.query.id},function(err,result){
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