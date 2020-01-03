const express  = require("express");
const router = express.Router();

const { check, validationResult} = require("express-validator");
const{ ErrorHandler, handleError} = require('../../helper/error')

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
        .then(appointments => {
            try {
                if(appointments.length==0)
                throw new ErrorHandler (400, 'Unable to find');
                else
                res.json(appointments)
                next()
            } catch (error) {
                next()
            }
        })
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

// router.put("/:id",
// [
//     check("cd", "code is mandatory and cant be empty")
//         .not()
//         .isEmpty(),
//     check("Type", "Type of appointment required can't be empty")
//         .not()
//         .isEmpty(),
//     check("description","Description is mandatory and can't be empty")
//         .not()
//         .isEmpty()
// ],
// async function(req,res,next) {

//     //validation check
//     const errors=validationResult(req);
//         if(!errors.isEmpty()){
//             return res.status(400).jsonp(errors.array());
//         }else{
//            await AppointmnetType.findOneAndUpdate({id:req.query.id},req.body)
//                 .then(appointmenttype =>{
//                     try {
//                         if(appointmenttype==null)
//                         throw new ErrorHandler(404,"Unable to find " +req.query.id);
//                         else
//                         res.json(appointmenttype);
//                     } catch (error) {
//                         next(error);
//                     }
//                 })
//                 .catch(err =>res.json(err));    
//     }
// }); 

router.put('/:id', (res, req) => {
    // validate the request 
    if(!req.body.content){
        throw new ErrorHandler( 400, " note content cant be empty ");
    }

    //find the data by id and update it with request body 
    AppointmnetType.findOneAndUpdate(req.params.id, {
        cd: req.body.cd,
        Type: req.body.Type,
        decription: req.body.description
    }, {new: true})
    .then(appointmentType =>{
        if(appointmentType === null){
            // throw new ErrorHandler(404, " unable to find with id "+ req.params.id)
            return res.statusCode(400).json({ message: " there is nothing to update "})
        }
        res.json({message: "successfully updated the data "})
    })
    .catch(err =>{
        if (err.kind === 'ObjectId'){
            // throw new ErrorHandler(404, " unable to find with id" +req.params.id);
            return res.statusCode(404).json({ message: " ubanle to find"}) 
        }
        return res.statusCode(500).json({
            message: " error in updating the with id " +req.body.id
        });
    });
});




module.exports = router;
