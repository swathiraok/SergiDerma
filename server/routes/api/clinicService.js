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
    //   check("cd", "servicecode or serviceid required")
    //     .not()
    //     .isEmpty(),
      check("Type", "Type of service  is mandatory") 
        .not()
        .isEmpty()
    ],
    function(req, res){
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()){
            return res.status(422).jsonp(errors.array());
        }else{
            ClinicService.create(req.body)
            .then(services => res.json({ message: "new clinic services created successfully"}))
            .catch(err => res.status(500).json(err));
        }
        
    });

/**
 * @route GET 
 * @description get all the Clinic Services 
 * @access public
*/
router.get('/', (req, res)=>{
    ClinicService.find()
    .then(services => res.json(services))
    .catch(err => res.json(err))
});

/**
 * @route GET /:id
 * @description GET the services by unique id 
 * @access 
 * Only for  testing not mandatory
 */
router.get("/:id", (req, res) =>{
    ClinicService.findById(req.params.id)
    .then(services => res.json(services))
    .catch(err => res.status(404).json(err))
});

/**
 * @route PUT /:id
 * @description Update the clinic services 
 * @access admin
 */
router.put('/:id', (req, res) => {
    ClinicService.findOneAndUpdate(req.params.cd, req.body)
    .then(services => res.json({ message:" clinic services were updated successfully"}))
    .catch(err => res.status(404).json("Unable the update the clinic service"))
});

router.delete("/:id", (req, res) => {
    ClinicService.findByIdAndRemove(req.params.id, req.body)
    .then(services => res.json({ message: "clinic service entry was deleted succesfully"}))
    .catch(err => res.status(400).json(err))
});

module.exports = router;