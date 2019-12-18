const express = require("express");
const router = express.Router();



const {check, validationResult} = require('express-validator/check');


// Load Doctor model
const Doctor = require("../../models/Doctor");

// @route GET doctor/getAllDoctors
// @description Get all doctor
// @access Public
router.get("/getAllDoctors", (req, res) => {   
  Doctor.find()
    .then(doctors => res.json(doctors))
    .catch(err => res.status(404).json({ nodoctorsfound: "No Doctors found" }));
});
// @route POST doctor/register
// @description add  doctor
// @access public 

router.post("/register",[
    check('firstName','First name is requered!!').not().isEmpty(),
    check('lastName','Last name is requered!!').not().isEmpty(),
    check('email','Your email id is not valid').not().isEmpty(),
    check('phoneNumber','Your phone number is not valid').not().isEmpty(),
    check('specialization','specialization is requered').not().isEmpty(),
    check('qualification','qualification is requered').not().isEmpty(),
     
],
function(req,res){
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        Doctor.create(req.body)
        .then(patient => res.json({message: "Doctor added successfully..",
                                   status:"200",}))
        .catch(err =>res.status(500).json({error:"Unable to create server"}))
    }
});

// @route GET api/doctor/getAll
 // @description Get All Doctor with pagination
 // @access Public npm install express-validator
router.get('/getAll',(req,res) => {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
    Doctor.find({},{},query,function(err,data) {
          // Mongo command to fetch all data from collection.
              if(err) {
                  response = {"error" : true,"message" : "Error fetching data"};
              } else {
                  response = {"error" : false,"message" : data};
              }
              res.json(response);
          });
  })




// @route GET doctor/getById:id
 // @description Get single Doctor by id
 // @access Public npm install express-validator
 router.get("getById/:id", (req, res) => {
  Doctor.findById(req.params.id)
     .then(doctor => res.json(doctor))
     .catch(err => res.status(404).json({ msg: " Doctor Record are Not found.." }));
 });
 

 // @route put doctor/update:id
 // @description Update Doctors
 // @access Public
 router.put("update/:id", (req, res) => {
  Doctor.findByIdAndUpdate(req.params.id, req.body)
     .then(doctor => res.json({ msg: "Updated successfully" }))
     .catch(err =>
       res.status(400).json({ error: "Unable to update the Database" })
     );
});

 // @route GET doctor/deleteById:id
 // @description Delete doctor by id
 // @access Public
 router.delete("deleteById/:id", (req, res) => {
  Doctor.findByIdAndRemove(req.params.id, req.body)
     .then(doctor => res.json({ mgs: "Doctor entry deleted successfully" }))
     .catch(err => res.status(404).json({ error: "No such a Doctor" }));
 });

module.exports = router;