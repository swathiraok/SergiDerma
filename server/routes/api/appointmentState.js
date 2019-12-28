const express  = require("express");
const router = express.Router();

const { check, validationResult} = require("express-validator");

//load the model
const AppointmnetState = require("../../models/AppointmentState");

/**
 * @route POST Appointment state 
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
        .isEmpty()
],
function(req, res) {
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()) {
        return res.status(400).jsonp(errors.array());
    }else{
        AppointmnetState.create(req.body)
         .then(appointments =>res.json({ message: 'Appointment state  saved successfully'}))
         .catch(err => res.status(500).json(essage:err.message || " Internal server error"));
        }
    }
);

/**
 * @route GET /appointment
 * @description view all the appointment states  
 * @access public
 */
router.get("/", (req, res) => {
    AppointmnetState.find()
        .then(appointments => res.json(appointments))
        .catch(err => {
            res.status(500).json({message : err.message || "Internal server error"})
        })
});

/**
 * @route PUT appointment state /:id
 * @description updates appointment state 
 * @access public
 */
router.put("/:id", async function(req, res){

    //validate the request
    if(!appointments){
        return res.status(400).json({ message : " request body cannot be empty " + req.params.id});
    }
    
    //finding the appointment state by Id  and update it 
    AppointmnetState.findByIdAndUpdate(req.params.id, req.body)
        .then(appointments =>
            {
            if(!appointments){
                return res.status(404).json({ message: "appointments state not found with id" +req.params.id});
            }
            return res.json({ message: " appointment data updated successfully"});
        })
        .catch(err => {
            if(err.kind === 'objectId'){
                return res.status(404).json({ message: "appointmenmts state not found with id " +req.params.id})
            }
            return res.status(500).json({ message : "Error in updating with this id " +req.params.id})
        })
});


module.exports = router;
