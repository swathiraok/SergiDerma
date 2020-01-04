const express =  require("express");
const router = express.Router();

const { check, validationResult} = require("express-validator");
const { ErrorHandler, handleError} = require('../../helper/error');

//Load the service model
const ClinicService = require("../../models/ClinicService");

/**
 * @route post 
 * @description Post clinic services 
 * @access admin 
 */

router.post(
    "/",
    [
      check("cd", "servicecode or serviceid required")
        .not()
        .isEmpty(),
      check("Type", "Type of service  is mandatory") 
        .not()
        .isEmpty()
    ],
    function(req, res){
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()){
            return res.status(400).jsonp(errors.array());
        }else{
            ClinicService.create(req.body)
            .then(services => res.json({ message: "new clinic services created successfully"}))
            .catch(err => res.status(500).json({ message:err.message || " Internal server error"}));
        }
        
    });

/**
 * @route GET /clinicService
 * @description get all the Clinic Services 
 * @access public
*/
router.get('/', (req, res)=>{
    ClinicService.find()
    .then(services => {
        try {
            if(services==null)
            throw new ValidaError(404,"Unable to find " +req.query.id);
            else
            res.json(services);
        } catch (error) {
            next(error);
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Internal server error"})
    })
});



router.put("/:id",
    [
      check("cd", "servicecode or serviceid required")
        .not()
        .isEmpty(),
      check("Type", "Type of service  is mandatory") 
        .not()
        .isEmpty()
    ],
    async function(req,res,next) {
        //validation check
        const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.statusCode(400).jsonp(errors.array());
            }else{
               await ClinicService.findOneAndUpdate({id:req.query.id},req.body)
                .then(clinicserviceResult =>{
                try {
                    if(!clinicserviceResult)
                    throw new ErrorHandler (404,"no such type of clinic service exists with id  " +req.query.id);
                    else
                    res.json({message: "updated the the clinic services successfully"});
                    } catch (error) {
                        next(error);
                    }
                })
                .catch(err =>res.statusCode(500).json({message: "Error in updatng the clinic services"}));    
            }
});            
        


module.exports = router;