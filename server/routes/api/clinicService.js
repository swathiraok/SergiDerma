const express =  require("express");
const router = express.Router();

const { check, validationResult} = require("express-validator");

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


/**
 * @route PUT /:id
 * @description Update the clinic services 
 * @access admin
 */
// router.put('/:id', async function(req, res) {
//     //validate the request
//     if(!req.body){
//         return res.status(400).json({
//             message: "request body cant be empty"
//         });
//     }

//     //find the clinic service by id and update it 
//     ClinicService.findByIdAndUpdate(req.params.id, req.body)
//     .then(services => {
//         if(!services){
//             return res.status(404).json({ message : "service not found wit Id" + req.params.id});
//         }
//         res.json({ message: "clinic service data updated successfully"});
//     })
//     .catch(err => {
//         if(err.kind === 'objectId') {
//             return res.status(404).json({ message: "service not found with id" + req.params.id});
//         }
//         return res.status(500).send({ message : "Error in updating with id " + req.params.id});
//     });
// });

router.put(
    "/",
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
                return res.status(422).jsonp(errors.array());
            }else{
               await ClinicAddr.findOneAndUpdate({ClinId:req.query.id},req.body)
                .then(result =>{
                try {
                    if(result==null)
                    throw new ValidaError(404,"Unable to find " +req.query.id);
                    else
                    res.json(result);
                    } catch (error) {
                        next(error);
                    }
                })
                .catch(err =>res.json(err));    
            }
});            
        


module.exports = router;