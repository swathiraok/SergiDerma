const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
var dateFormat = require('dateformat');
//load patient model
const Appointment = require("../../models/Appointment");

//@route create appointments/
//@description create appointments
//public access
router.post("/",[
    check('drNm','Doctor name is required!!').not().isEmpty(),
    check('ptNm','Patient name is required!!').not().isEmpty(),
    check('date','Date is required!!').not().isEmpty(),
    check('time','Time is required!!').not().isEmpty(),
],
function(req,res){
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        Appointment.create(req.body)
        .then(appointment => res.json({message: "Appointment booked successfully..",
                                   status:"200" }))
        .catch(err =>res.status(500).json(err));
    }
});

router.get("/all",(req,res) =>{
    Appointment.find()
        .then(function(appointment){
            res.json(appointment)
        })
        .catch(err =>res.status(404).json({error: "Appointments not found"}));
});

// router.get("/",(req,res) =>{
//     Appointment.find()
//     .then(function(appointment){
//         // appointment.forEach(function(appointment){
//         //     // a={
//         //     //     aa:patient,
//         //     //     bb:patient.ptntId
//         //     // }
//         // })
//         res.json(appointment)
//     })
//     .catch(err =>res.status(404).json({error: "Appointments not found"}))
// });

router.get("/",(req,res) =>{
    // let date_ob = new Date();
    // let date = ("0" + date_ob.getDate()).slice(-2);
   
var now = new Date();
var datenow = dateFormat(now, "yyyy-mm-dd");
    // console.log(datVal);
    console.log(datenow);
    var query = { date: datenow };
    // var iso =searchItem.toUTCString();
    Appointment.find(query)
            .then(appointment => res.json(appointment))
            .catch(err => res.status(404).json({error: "Unable to found!!"}))
});


module.exports = router;