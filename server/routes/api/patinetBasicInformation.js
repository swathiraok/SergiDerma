const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');


//load patientBasicInfor model
const PatientBasicInfo = require("../../models/PatientBasicInformation");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("patient route testing!"));


//@route POST api?patientBasicInfor
//@description add/save patientBasicInfo detail
//access public
//server validation "check"
/*    request body {
    "ptHeight":"",
    "ptWeight":""
    "ptBMI":""
    "ptHealthIssue":""
    "ptHabit":{
    	"exercise":{
    		"day":"never"
    	},
    	"eating_following_a_diet":{
    		"diet":"i have a loose diet"
    	},
    	"alcohol_consumption":{
    		"day":"i don't drink"
    		
    	},
    	"caffeine_consumption":{
    		"day":"1-2cup/day"
    	},
    	"do you smoke":{
    		"day":"no"
    	},
    "ptInsurance":{
        "sub_name":"",
        "sub_DOB":"",
        "rel_to_sub":"",
        "emp_name":"",
        "emp_phone":"",
        "occupation":""
    },
    "ptBloddGroup:"",
    "ptAllergies":[{
    	"name":"Anemia"
    },{
    	"name":"Astham"
    }],
    "ptAnyOperation":"",
    "ptCurrentMedications":"",
    "ptNote":""
} */
router.post("/addPatientBasicInfo/",[
    check('ptHeight','Patient Height is required!!').not().isEmpty(),
    check('ptWeight','Patient weight is required!!').not().isEmpty(),
    check('ptBMI','Patient BMI  is required!!').not().isEmpty(),
    check('ptBloddGroup','Patient blood group is required!!').not().isEmpty(),
    check('ptAllergies','Patient allergies is required!!').not().isEmpty(),
    check('ptAnyOperation','Patient any operation is required!!').not().isEmpty(),
    check('ptCurrentMedications','Patient current medication  is required!!').not().isEmpty(),
    check('ptHabit','Patient ptHabit is required!!').not().isEmpty()
    //check('pntnHabit','Your email id is not valid').not().isEmpty()
],
function(req,res){
    //validation check
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        PatientBasicInfo.create(req.body)
        .then(patientInfo => res.json({id:patientInfo.id,
                                   message: "Patient basic infor added successfully..",
                                   status:"200",
                                   patientId:patientInfo.ptntId }))
        .catch(err =>res.status(500).json(err))
    }
});


//@rounte GET api/patientBasicInfor
//@description get individual ptId list information
// public access
/* parameter
    ptId:1111 mandotary field
    skips:1, //option
    limits:1 //option
*/
    router.get("/patientList",(req,res)=>{
  
        var query=req.query;
        let skipPage=Number(req.query.page);
        let limitPage=Number(req.query.size);
        let sortPage=req.query.ptntBMI;
    
        console.log("skips value",skipPage);
        console.log("query formate",query);
    
    // sort:{updated_date:-1}
                    PatientBasicInfo.find({ptId:req.query.ptId},req.ptId,{skip:skipPage,limit:limitPage},function(err,result){
                        if (err) {
                            res.json(err);
                        }else{
                            res.json(result);
                        }
                    });
    });


//@route PUT api?patientInfor
//@description update patientInfo detail
//access public
/*    request body {
    "ptHeight":"",
    "ptWeight":""
    "ptBMI":""
    "ptHealthIssue":""
    "ptHabit":{
    	"exercise":{
    		"day":"never"
    	},
    	"eating_following_a_diet":{
    		"diet":"i have a loose diet"
    	},
    	"alcohol_consumption":{
    		"day":"i don't drink"
    		
    	},
    	"caffeine_consumption":{
    		"day":"1-2cup/day"
    	},
    	"do you smoke":{
    		"day":"no"
    	},
    "ptInsurance":{
        "sub_name":"",
        "sub_DOB":"",
        "rel_to_sub":"",
        "emp_name":"",
        "emp_phone":"",
        "occupation":""
    },
    "ptBloddGroup:"",
    "ptAllergies":[{
    	"name":"Anemia"
    },{
    	"name":"Astham"
    }],
    "ptAnyOperation":"",
    "ptCurrentMedications":"",
    "ptNote":""
} */
router.put("/patientBasicInfoUpdate/:id",async function(req, res) {
    // const id =req.query.patientId;
    PatientBasicInfo.findOneAndUpdate()

    PatientBasicInfo.findByIdAndUpdate(req.params.id, req.body)
    .then(patient =>res.json({message: "Update patient successfully"}))
    .catch(err =>res.status(404).json({error: "patient not found"}))
});   


//@route Serach api/patientInfo
//@description search globaly patientInformation 
//public access
router.get("/serachPatient/:searchName",(req,res) =>{
    var searchItem=req.params.searchName;
    console.log("item name",searchItem);
    PatientBasicInfo.find()
                .then(function(patientInfo){
                    //filter patient list
                        var filt=patientInfo.filter(word =>word.ptHeight==searchItem || word.ptWeight==searchItem || word.ptBMI==searchItem);
                        
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


//@route GET api?patientBasicInfor
//@description get all patientBasicInfo detail
//access public

router.get("/getPatientBasicInfor",(req,res) =>{

    PatientBasicInfo.find()
                    .then(patientBasicInfo =>res.json(patientBasicInfo))
                    .catch(err =>res.json(err));

});


//asys
router.get("/getRelation",async function(req,res) {


    // var a=new Desiriel("1","title");
    // console.log("response",a);
    // res.json(a);
    
    const patientValue=await PatientBasicInfo.find().populate("patient");
    res.json(patientValue);
    console.log("all record",patientValue);

})

router.get("/all",(req,res) =>{
    var a;
    PatientBasicInfo.find()
    .then(function(patient){
        patient.forEach(function(patient){
            console.log("id",patient.ptId)
            a=new Desiriel(patient.ptId,patient.ptWeight);
        })
        res.json(a)
    })
    .catch(err =>res.status(404).json({error: "Patients not found"}))
});

module.exports = router;
