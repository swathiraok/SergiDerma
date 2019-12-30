const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const { handleError,ValidaError } = require('../../CenterErrorHandle/error')

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
//@public access
//@paramter day:1222
router.put("/updateClinicHolyday",[
    check('ClinId','clinic ClinId is required!!').not().isEmpty(),
    check('dt','clinic holy day is required!!').not().isEmpty(),
    check('Htype','clinic type is required!!').not().isEmpty()
], async function(req,res,next) {

    console.log("day",req.query.day)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        await ClinicHolyday.findOneAndUpdate({dt:req.query.day},req.body,{new: true}, function(err,result) {
        
            try {
                if(err)
                res.status(500).json(err);
                else
                if(result==null)
                throw new ValidaError(404,"Unable to find " +req.query.day)
                else
                res.json(result)
            } catch (error) {
                next(error)
            }
          
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
router.get("/getClinicHolyday",(req,res,next) =>{

    console.log("id",req.query.id)
    let skipPage=Number(req.query.page);
    let limitPage=Number(req.query.size);

    console.log("skip",skipPage)
    console.log("query",req.query)
    ClinicHolyday.find({ClinId:req.query.id},function(err,result){
        try {
            if(err)
            res.status(500).json(err)
            else
            if(result.length==0)
            throw new ValidaError(400,"Unable to find " +req.query.id);
            else
            res.json(result)
            
        } catch (error) {
            next(error)
        }
        
    }).skip(skipPage).limit(limitPage)
});




module.exports=router;