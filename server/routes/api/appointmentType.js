const express  = require("express");
const router = express.Router();

const { check, validationResult} = require("express-validator");

//load the model
const AppointmnetType = require("../../models/AppointmentType");

/**
 * @route POST AppointmentType 
 * @description create a appointment type 
 * @access admin
 */
router.post("/",
[
    check("cd", "code is mandatory and cant be empty")
        .not()
        .isEmpty(),
    check("Type", "Type of appointment required can't be empty")
        .not()
        .isEmpty(),
    check("description","Description is mandatory and can't be empty")
        .not()
        .isEmpty()
],
function(req, res) {
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }else{
        AppointmnetType.create(req.body)
         .then(specializations =>res.json({ message: 'Appointment type  saved successfully'}))
         .catch(err => res.status(400).json(err));
        }
    }
);

/**
 * @route GET /appointment
 * @description view all the appointment types  
 * @access public
 */
router.get("/", (req, res) => {
    AppointmnetType.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.json(err))
});

/**
 * @route GET /:id 
 * @description view the specialization by id 
 * @access public 
 * not mandatory just test purpose 
 */
router.get("/:id", (req, res) =>{
    AppointmnetType.findById(req.params.id)
        .then(appointments => res.json(appointments))
        .catch(err => res.status(404).json(err))
});

/**
 * @route PUT appointment type /:id
 * @description updates appointment types 
 * @access public
 */
router.put("/:id",async function(req, res){
    AppointmnetType.findByIdAndUpdate(req.params.id, req.body)
        .then(appointments => res.json({ message: "updated appointment type  successfully "}))
        .catch(err => res.status(404).json({error: "appointment type not found  not found"}))


});
module.exports = router;
