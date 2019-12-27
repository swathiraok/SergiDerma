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
        return res.status(422).jsonp(errors.array());
    }else{
        Specialization.create(req.body)
         .then(specializations =>res.json({ message: 'specialization saved successfully'}))
            .catch(err => res.status(404).json(err));
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
        .catch(err => res.json(err))
});

/**
 * @route GET /:id 
 * @description view the specialization by id 
 * @access public 
 */
router.get("/:id", (req, res) =>{
    Specialization.findById(req.params.id)
        .then(specializations => res.json(specializations))
        .catch(err => res.status(404).json(err))
});

/**
 * @route PUT specialization /:id
 * @description update specialization
 * @access public
 */
router.put("/:id",async function(req, res){
    Specialization.findByIdAndUpdate(req.params.id, req.body)
        .then(specializations => res.json({ message: "updated specialization successfully "}))
        .catch(err => res.status(404).json({error: "patient not found"}))


});
module.exports = router;
