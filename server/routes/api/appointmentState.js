const express  = require("express");
const router = express.Router();
const { handleError, ErrorHandler } = require('../../helpers/error');

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
async function(req, res, next) {
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()) { 
        return res.status(400).jsonp(errors.array());
    }else{
        AppointmnetState.create(req.body)
         .then(appointments =>res.json({ message: 'Appointment state  saved successfully'}))
         .catch(err => res.status(500).json({message:" Internal server error"}));
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
        .then(appointments => {
            try {
                if(appointments.length==0)
                throw new ValidaError(400, 'Unable to find');
                else
                res.json(appointments)
                next()
            } catch (error) {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message : "Internal server error"})
        })
});

/**
 * @route PUT appointment state /:id
 * @description updates appointment state 
 * @access public
 */
// router.put("/:id", async function(req, res){

//     //validate the request
//     if(!appointments){
//         return res.status(400).json({ message : " request body cannot be empty " + req.params.id});
//     }
    
//     //finding the appointment state by Id  and update it 
//     AppointmnetState.findByIdAndUpdate(req.params.id, req.body)
//         .then(appointments =>
//             {
//             if(!appointments){
//                 return res.status(404).json({ message: "appointments state not found with id" +req.params.id});
//             }
//             return res.json({ message: " appointment data updated successfully"});
//         })
//         .catch(err => {
//             if(err.kind === 'objectId'){
//                 return res.status(404).json({ message: "appointmenmts state not found with id " +req.params.id})
//             }
//             return res.status(500).json({ message : "Error in updating with this id " +req.params.id})
//         })
// });

router.put("/:id",
[
    check("cd", "code is mandatory and cant be empty")
        .not()
        .isEmpty(),
    check("Type", "Type of appointment required can't be empty")
        .not()
        .isEmpty()
],
async function(req,res,next) {

    //validation check
    const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).jsonp(errors.array());
        }else{
           await AppointmnetState.findOneAndUpdate({id:req.query.id},req.body)
                .then(appointments =>{
                    try {
                        if(!appointments)
                        throw new ErrorHandler(404,"Unable to find " +req.query.id);
                        else
                        res.json({message:"successfully updated"});
                    } catch (error) {
                        next(error);
                    }
                })
                .catch(err =>res.json(err));    
    }
});  

module.exports = router;
