const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

//load patient model
const Patient = require("../../models/Patient");
const Book = require('../../models/Book');


// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("patient route testing!"));

//@route post api?patient
//@description add/save patient detail
//access public
//server validation check
//request body {
//    "patientFirstName":"",
//    "patientLastName":""
//    "email":""
//    "phone":""
//    "typeOfWalkin":""
//    "aligment":""
//    "doctor":""}
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
        .catch(err =>res.status(500).json(err))
        // .catch(err =>res.status(500).json({error:"Unable to create server"}))
    }
});

//@route GET api/patient
//@description get all patient
//public access

router.get("/getAll",(req,res) =>{
    Patient.find()
    .then(patients =>res.json(patients))
    .catch(err =>res.status(404).json({error: "Patients not found"}))
});
//@route PUT api/patient
//@description update patient
//public access
//update body  {
//    "patientFirstName":"",
//    "patientLastName":""
//    "email":""
//    "phone":""
//    "typeOfWalkin":""
//    "aligment":""
//    "doctor":""}

router.put("/patientUpdate/:id",async function(req, res) {
    
    // const id =req.query.patientId;

    Patient.findByIdAndUpdate(req.params.id, req.body)
    .then(patient =>res.json({message: "Update patient successfully"}))
    .catch(err =>res.status(404).json({error: "patient not found"}))

    
});



//@rounte GET api/patient
//@description get individual data
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

module.exports = router;

