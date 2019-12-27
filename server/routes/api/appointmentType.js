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
        return res.status(400).jsonp(errors.array());
    }else{
        AppointmnetType.create(req.body)
         .then(specializations =>res.json({ message: 'Appointment type  saved successfully'}))
         .catch(err => res.status(500).json({message: err.message || " Internal server error"}));
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
        .catch(err => {
            res.status(500).json({ message : err.message || " Internal server erroe"});
        })
   
});

/**
 * @route PUT appointment type /:id
 * @description updates appointment types 
 * @access public
 */
router.put("/:id",async function(req, res){

    //validate the request
    if(!req.body){
        return res.status(400).json({message: "request body cannot be empty"});
    }
    //find the appointment type by id and update it 
    AppointmnetType.findByIdAndUpdate(req.params.id, req.body)
        .then(appointments => {
            if(!appointments){
                return res.status(404).json({ message:" appointment type not found with id " +req.params.id})
            }
            return res.json({ message :" appointment data updated successfully"});
        })
        .catch(err => {
            if(err.kind === 'objectId'){
                return res.status(404).json({ message: " appointment type not found with id" + req.params.id})
            }
            return res.status(500).json({ message: "Error in updating the appointment type" + req.params.id})
        })
});
module.exports = router;
