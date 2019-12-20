const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

//load patient model
const PatientInfo = require("../../models/PatientInformation");
const Book = require('../../models/Book');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("patient route testing!"));

//@route POST api?patient
//@description add/save patient detail
//access public
//server validation check
//request body {
//    "ptntHeight":"",
//    "ptntWeight":""
//    "ptntBMI":""
//    "ptntHealthIssue":""
//    "pntnHabit":""
//    "pntnInsurance":""}
router.post("/addPatientInfo/",[
    check('ptntHeight','Patient Height is required!!').not().isEmpty(),
    check('ptntWeight','Patient weight is required!!').not().isEmpty(),
    check('ptntBMI','Patient BMI  is required!!').not().isEmpty(),
    check('ptntHealthIssue','Patient issue is required!!').not().isEmpty(),
    //check('pntnHabit','Your email id is not valid').not().isEmpty()
],
function(req,res){
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        PatientInfo.create(req.body)
        .then(patientInfo => res.json({id:patientInfo.id,
                                   message: "Patient added successfully..",
                                   status:"200",
                                   patientId:patientInfo.ptntId }))
        .catch(err =>res.status(500).json(err))
        // .catch(err =>res.status(500).json({error:"Unable to create server"}))
    }
});

//@rounte UPT api/patient
//@description update individual data
//public access
//@route GET api/patient
//@description get all patient
//public access

router.get("/getAll",(req,res) =>{
    PatientInfo.find()
    .then(patients =>res.json(patients))
    .catch(err =>res.status(404).json({error: "Patients not found"}))
});

//request body {
//    "ptntHeight":"",
//    "ptntWeight":""
//    "ptntBMI":""
//    "ptntHealthIssue":""
//    "pntnHabit":""
//    "pntnInsurance":""}

router.put("/patientInfoUpdate/:id",async function(req, res) {
    
    // const id =req.query.patientId;

    PatientInfo.findByIdAndUpdate(req.params.id, req.body)
    .then(patient =>res.json({message: "Update patient successfully"}))
    .catch(err =>res.status(404).json({error: "patient not found"}))

    
});



//@rounte GET api/patient
//@description get individual data
//public access
router.get("/patientInfoInd/:id",(req,res) =>{

    PatientInfo.findById(req.params.id)
            .then(patient => res.json(patient))
            .catch(err => res.status(404).json({error: "Unable to found!!"}))
});

//@route DELETE api/patient
//@description delete patient by patient id
//public access
router.delete("/deletePatientInfo/:id",(req,res) =>{
    
    PatientInfo.findByIdAndRemove(req.params.id)
    .then(patient =>res.json({message: "patient deleted successfully"}))
    .catch(err =>res.status(404).json({error: "patient not found"}))
    
});

//@route Serach api/patient
//@@description search globaly 
//public access
router.get("/serachPatient/:id",(req,res) =>{
    var searchItem=req.params.id;
    console.log("item name",searchItem);
    PatientInfo.find()
                .then(function(patientInfo){
                    const filt=patientInfo.filter(word =>word.ptntHeight==searchItem || word.ptntWeight==searchItem || word.ptntBMI==searchItem || word.ptntHealthIssue==searchItem || word.pntnInsurance==searchItem);
                    res.json(filt)
                })
                .catch(err =>res.status(404).json(err));
});
module.exports = router;