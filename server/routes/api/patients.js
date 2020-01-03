const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const fieldEncryption = require('mongoose-field-encryption');
let keyString = "hpXa6pTJOWDAClC/J6POVTjvJpMIiPAMQiTMjBrcOGw="

//load patient model
const Patient = require("../../models/Patient");


// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("patient route testing!"));

//@route post api?patient
//@description add/save patient detail
//access public
//server validation check
/* request body 
{
    "patientFirstName":"",
    "patientLastName":""
    "email":""
    "phone":""
    "typeOfWalkin":""
    "aligment":""
    "doctor":""
}
     */
router.post("/addPatient/",[
    check('frstNm','First name is required!!').not().isEmpty(),
    check('lstNm','Last name is required!!').not().isEmpty(),
    check('gndr','gender is required!!').not().isEmpty(),
    check('dob','date of birth is required!!').not().isEmpty(),
    check('email','Your email id is not valid').not().isEmpty(),
    check('PhnNm','Your phone number is not valid').not().isEmpty(),
    check('type','type of walkin is requered').not().isEmpty()
],
function(req,res){
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        Patient.create(req.body)
        .then(patient => res.json({id:patient.id,
                                   message: "Patient added successfully..",
                                   status:"200",
                                   patientId:patient.ptntId }))
        .catch(err =>res.status(500).json(err));
    }
});



//@route GET api/patient
//@description get all patient with limit size and after skip size
//public access
router.get("/patientList",(req,res) =>{

    let skipPage=Number(req.query.page);
    let limitPage=Number(req.query.size);

    console.log("skip",skipPage)
    console.log("query",req.query)
    Patient.find().skip(skipPage).limit(limitPage)
            .then(patient =>res.json(patient))
            .catch(err =>res.json(err));
});


//@route PUT api/patient
//@description update patient
//public access

/* individual or multiple key and value update, body  {
   "patientFirstName":"",
   "patientLastName":""
    "email":""
    "phone":""
    "typeOfWalkin":""
    "aligment":""
    "doctor":""
} */

router.put("/patientUpdate/:id",async function(req, res) {
    
    // const id =req.query.patientId;
    Patient.findByIdAndUpdate(req.params.id, req.body)
    .then(patient =>res.json({message: "Update patient successfully"}))
    .catch(err =>res.status(404).json({error: "patient not found"}))

    
});

//@route Serach api/patient
//@description search globaly patient 
//public access
/* search params by first name or last name or email or phone */
router.get("/serachPatient/:searchName",(req,res) =>{
    var searchItem=req.params.searchName;
    console.log("item name",searchItem);
    Patient.find()
                .then(function(patient){
                    //filter patient list
                        var filt=patient.filter(word =>word.frstNm==searchItem || word.lstNm==searchItem || word.PhnNm==searchItem || word.email==searchItem);
                        if (filt.length==0) {
                            res.status(203).json({
                                message:"Unable to find " + req.params.searchName
                            })
                        }else{
                            res.json(filt)
                        }
                        
                })
                .catch(err =>res.status(404).json(err));
});


//@rounte GET api/patient
//@description get individual patient data
//public access
router.get("/patientInd/:id",(req,res) =>{

    Patient.findById(req.params.id)
            .then(patient => res.json(patient))
            .catch(err => res.status(404).json({error: "Unable to found!!"}))
});

//@route DELETE api/patient
//@description delete patient by patient id
//public access
router.delete("/deletePatient/:id",(req,res) =>{
    
    Patient.findByIdAndRemove(req.params.id)
    .then(patient =>res.json({message: "patient deleted successfully"}))
    .catch(err =>res.status(404).json({error: "patient not found"}))
    
});

router.get("/getAll",(req,res)=>{
    Patient.find()
            .then(result =>res.json(result))
            .catch(err =>res.json(err));
});

module.exports = router;

