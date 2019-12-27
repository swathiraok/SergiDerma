const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

//load patientBasicInfor model
const ClinicHolyday= require("../../models/ClinicHoliday");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("clinicAdd route testing!"));



router.post("/addClinicHolyday/",[
    check('ClinId','clinic ClinId is required!!').not().isEmpty(),
    check('dt','clinic holy day is required!!').not().isEmpty(),
    check('Htype','clinic type is required!!').not().isEmpty()
],
async function(req,res){
    //validation check
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
      ClinicHolyday.create(req.body)
        .then(result => res.json({id:result.ClinId,
                                   message: "ClinicHoly added successfully..",
                                   status:"200" }))
        .catch(err =>res.status(500).json(err))

      
    }       
});

//@route PUT api/ClinicHolyday
//@description update clinic holyday 
//public access
router.put("/updateClinicHolyday",[
    check('ClinId','clinic ClinId is required!!').not().isEmpty(),
    check('dt','clinic holy day is required!!').not().isEmpty(),
    check('Htype','clinic type is required!!').not().isEmpty()
], async function(req,res) {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        await ClinicHolyday.findOneAndUpdate({dt:req.query.day},req.body,{new: true}, function(err,result) {
            if(err)
            res.status(500).json(err);
            else
            if(result==null)
            res.status(404).json({error:"Unable to found"})
            else
            res.json(result)
        });
    }
});


//@rounte GET api/ClinicHolyday
//@description get all Clinic holyday
// public access
/* parameter
    id:1111 mandotary field
    skips:1, //option
    limits:1 //option
*/
router.get("/getClinicHolyday",(req,res) =>{

    let skipPage=Number(req.query.page);
    let limitPage=Number(req.query.size);

    console.log("skip",skipPage)
    console.log("query",req.query)
    ClinicHolyday.find({ClinId:req.query.id},function(err,result){
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