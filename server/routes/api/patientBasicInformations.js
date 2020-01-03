const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

//load patientBasicInfor model
const PatientBasicInfo = require("../../models/PatientBasicInformation");


//@route POST patientBasicInfo/
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
router.post("/",[
    check('ptHabit','Patient ptHabit is required!!').not().isEmpty()
],
function(req,res){
    //validation check
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        PatientBasicInfo.create(req.body)
        .then(patientInfo => res.json({message: "Patient basic infor added successfully..",
                                   status:"200",
                                   patientId:patientInfo.ptntId }))
        .catch(err =>res.status(500).json(err))
    }
});


//@rounte GET patientBasicInfo/
//@description get individual ptId list information
// public access
/* parameter
    ptId:1111 mandotary field
    skips:1, //option
    limits:1 //option
*/
    router.get("/",(req,res)=>{
  
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


//@route PUT patientBasicInfo/:id
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
router.put("/:id",async function(req, res) {
    // const id =req.query.patientId;
    PatientBasicInfo.findByIdAndUpdate(req.params.id, req.body)
    .then(patient =>res.json({message: "Update patient successfully"}))
    .catch(err =>res.status(404).json({error: "patient not found"}))
});   


//@route Serach patientBasicInfo/serachPatient/:searchName
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


//@route GET patientBasicInfo/
//@description get all patientBasicInfo detail
//access public

router.get("/",(req,res) =>{

    PatientBasicInfo.find()
                    .then(patientBasicInfo =>res.json(patientBasicInfo))
                    .catch(err =>res.json(err));

});


module.exports = router;