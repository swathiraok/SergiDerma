const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const { handleError,ValidaError } = require('../../CenterErrorHandle/error')

//load patientBasicInfor model
const DoctorInform = require("../../models/DoctorInfo");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("clinicAdd route testing!"));


//@route POST api/doctorInfor
//@description Add /save doctor information
//public access
router.post("/addDoctorInfor/",[
    check('fname','Doctor first name is required!!').not().isEmpty(),
    check('lname','Doctor last name is required!!').not().isEmpty(),
    check('dob','Doctor dob is required!!').not().isEmpty(),
    check('addrIn1','Doctor addr 1 is required!!').not().isEmpty(),
    check('addrIn2','Doctor addr 2 is required!!').not().isEmpty(),
    check('addrIn3','Doctor addr 3  is required!!').not().isEmpty(),
    check('addrIn4','Doctor addr 4 is required!!').not().isEmpty(),
    check('city',' city is required!!').not().isEmpty(),
    check('country','country is required!!').not().isEmpty(),
    check('state','state is required!!').not().isEmpty(),
    check('zpcode','zipCode is required!!').not().isEmpty(),
    check('contdtls','contact Details is required!!').not().isEmpty(),
    check('splzns','specialilize is required!!').not().isEmpty(),
    check('conslttmngs','Timing is required!!').not().isEmpty(),
    check('practstdt','Pra is required!!').not().isEmpty(),
    check('profsumm','profsumm is required!!').not().isEmpty(),
    check('actv','activity is required!!').not().isEmpty()

],
async function(req,res){
    //validation check
    console.log("triger data...")
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        DoctorInform.create(req.body)
        .then(result => res.json({id:result.docid,
                                   message: "doctor info added successfully..",
                                   status:"200" }))
        .catch(err =>res.status(500).json(err))
    }       
});

//@route PUT api/Leave calender
//@description update leave calender
//public access
/* 
    parameter id:doctor id
*/
router.put("/updateDoctorInform", async function(req,res,next) {
    
  await DoctorInform.findOneAndUpdate({docid:req.query.id},req.body,{new: true}, function(err,result) {
    try {
        if(err)
        res.status(500).json(err);
        else
        if(result==null)
        throw new ValidaError(404,"Unable to find!!")
      //  res.status(404).json({error:"Unable to found"})
        else
        res.json(result)
    } catch (error) {
        next(error) 
    }   
   });
});


//@rounte GET api/doctorInfor
//@description get doctor
// public access
/* parameter
    id:1111 mandotary field
    skips:1, //option
    limits:1 //option
*/
router.get("/getDoctorInform", (req,res,next) =>{
  
    console.log("")
    let skipPage=Number(req.query.page);
    let limitPage=Number(req.query.size);
    console.log("skip",skipPage)
    console.log("query",req.query)
         DoctorInform.find({docid:req.query.id},  function(err,result){       
           try {
            if(err)
            throw new ValidaError(500,err);
            if(result.length==0)
            throw new ValidaError(400, 'Unable to find');
            else
            res.json(result)
            next()
            } catch (error) {
                next(error);
               // res.json(error)
            }
                
    }).skip(skipPage).limit(limitPage)

});


router.get("/getAll",function( req, res ){
    req.pipe( request({
        url: config.backendUrl + req.params[0],
        qs: req.query,
        method: req.method
    }))
    .on('error', err => {
        const msg = 'Error on connecting to the webservice.';
        console.error(msg, err);
        res.status(500).send(msg);
    })
    .pipe( res );
});

module.exports=router;