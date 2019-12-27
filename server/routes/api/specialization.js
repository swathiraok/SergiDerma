const express  = require("express");
const router = express.Router();

const { check, validationResult} = require("express-validator");

//load the model
const Specialization = require("../../models/Specialization");

/**
 * @route POST specialization
 * @description create a new specialization
 * @access admin
 */
router.post("/",
[
    check("name", "name is mandatory and cant be empty")
        .not()
        .isEmpty(),
    check("description", "Descripton required cant be empty")
        .not()
        .isEmpty()
],
function(req, res) {
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()) {
        return res.status(400).jsonp(errors.array());
    }else{
        Specialization.create(req.body)
         .then(specializations =>res.json({ message: 'specialization saved successfully'}))
            .catch(err => res.status(500).json({ message:err.message || " Internal server error"}));
        }
    }
);

/**
 * @route GET /specialization
 * @description view all the specializaton
 * @access public
 */
router.get("/", (req, res) => {
    Specialization.find()
        .then(specializations => res.json(specializations))
        .catch(err => {
            res.status(500).json({ message : err.message || "Internal server error"})
        })
});

/**
 * @route PUT specialization /:id
 * @description update specialization
 * @access public
 */
router.put("/:id",async function(req, res){

    //validate the request
    if(!req.body){
        return res.status(400).json({ message : "request body cannot be empty"});
    }
    //find the clinic specs by Id and update it 
    Specialization.findByIdAndUpdate(req.params.id, req.body)
        .then(specializations => {
            if(!specializations){
                return res.status(404).json({ message : "specialization not found with id" + req.params.id });
            }
            return res.json({message: "specialization data updated successfully"});
        })
        .catch(err => {
            if(err.kind === 'objectId'){
                return res.status(404).json({ message : "service not found with id" + req.params.id })
            }
            return res.status(500).json({ message : "Error in updating with id" + req.params.id})
        })


});
module.exports = router;
