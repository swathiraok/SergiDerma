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

//@route post api/patient
//@description add/save patient detail
//@access public

// router.post("/", (req, res) => {
//     Patient.create(req.body)
//     .then(patient => res.json({msg: "Patient added successfully.."}))
//     .catch(err =>
//         res.status(400).json({error: "Unable to add this patien"})
//         );
// });

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
router.post("/",[
    check('patientFirstName','First name is requered!!').not().isEmpty(),
    check('patientLastName','Last name is requered!!').not().isEmpty(),
    check('email','Your email id is not valid').not().isEmpty(),
    check('phone','Your phone number is not valid').not().isEmpty(),
    check('typeOfWalkin','type of walkin is requered').not().isEmpty(),
    check('aligment','aligment is requered').not().isEmpty(),
    check('doctor','assign to doctor').not().isEmpty()
],
function(req,res){
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        Patient.create(req.body)
        .then(patient => res.json({message: "Patient added successfully..",
                                   status:"200",
                                patientId:patient.patientId }))
        .catch(err =>res.status(500).json({error:"Unable to create server"}))
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

router.put("/patientUpdate/:patientId",(req,res) =>{
    
    Patient.findOneAndUpdate(req.params.patientId, req.body)
    .then(patient =>res.json({msg: "Update patient successfully"}))
    .catch(err =>res.status(404).json({error: "patient not found"}))
});



//@rounte GET api/patient
//@description get individual data
//public access
router.get("/patientInd/:patientId",(req,res) =>{
    var id=req.query.patientId;
    Patient.findOne(id)
            .then(patient => res.json(patient))
            .catch(err => res.status(404).json({error: "Unable to found!!"}))
});

//@route DELETE api/patient
//@description delete patient by patient id
//public access
router.delete("/:patientId",(req,res) =>{
    Patient.findOneAndDelete(req.params.patientId)
    .then(patient =>res.json({msg: "patient deleted successfully"}))
    .catch(err =>res.status(404).json({error: "patient not found"}))
});



//nested response

router.get("/getDetails",(req,res) =>{
    Patient.find()
    .then(patient =>res.json({patient,
                            message:"nested start"}))
    .catch(err =>res.status(400).json({error:"not found patient"}))
});


module.exports = router;

