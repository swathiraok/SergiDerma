const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

//load patientInfor model
const PatientInfo = require("../../models/PatientInformation");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("patient route testing!"));


//@route POST api?patientInfor
//@description add/save patientInfo detail
//access public
//server validation "check"
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
    //validation check
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
    }
});

//@route PUT api?patientInfor
//@description update patientInfo detail
//access public
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


//@rounte GET api/patientInfor
//@description get individual patintId list information
// public access
/* parameter
    ptntId:1111 mandotary field
    skips:1,
    limits:1 */
router.get("/patientList",(req,res)=>{
  
    var query=req.query;
    let skipPage=Number(req.query.page);
    let limitPage=Number(req.query.size);
    let sortPage=req.query.ptntBMI;

    console.log("skips value",skipPage);
    console.log("query formate",query);

// sort:{updated_date:-1}
                PatientInfo.find({ptntId:req.query.ptntId},req.ptntId,{skip:skipPage,limit:limitPage},function(err,result){
                    if (err) {
                        res.json(err);
                    }else{
                        res.json(result);
                    }
                });
});

//@route Serach api/patientInfo
//@description search globaly patientInformation 
//public access
router.get("/serachPatient/:searchName",(req,res) =>{
    var searchItem=req.params.searchName;
    console.log("item name",searchItem);
    PatientInfo.find()
                .then(function(patientInfo){
                    //filter patient list
                        var filt=patientInfo.filter(word =>word.ptntHeight==searchItem || word.ptntWeight==searchItem || word.ptntBMI==searchItem || word.ptntHealthIssue==searchItem || word.pntnInsurance==searchItem);
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

module.exports = router;