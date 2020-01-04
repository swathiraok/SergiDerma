const express  = require("express");
const router = express.Router();

const { check, validationResult} = require("express-validator");
const { Errorhandler, handleError} = require("../../helper/error")

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
async function(req, res) {
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
        .then(specializations => {
            try {
                if(specializations==null)
                throw new ValidaError(404,"Unable to find " +req.query.id);
                else
                res.json(specializations);
            } catch (error) {
                next(error);
            }
        })
        .catch(err => {
            res.status(500).json({ message : "Internal server error"})
        })
});

/**
 * @route PUT specialization /:id
 * @description update specialization
 * @access public
 */
router.put("/:id",
[
    check("name", "name is mandatory and cant be empty")
        .not()
        .isEmpty(),
    check("description", "Descripton required cant be empty")
        .not()
        .isEmpty()
],
async function(req,res,next) {
    //validation check
    const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).jsonp(errors.array());
        }else{
           await Specialization.findOneAndUpdate({id:req.query.id},req.body)
            .then(specializations =>{
            try {
                if(!specializations)
                throw new Errorhandler(404,"such specializatio doesnt exists with id" +req.query.id);
                else
                res.json({message: "successfully updated the specilization"});
                } catch (error) {
                    next(error);
                }
            })
            .catch(err =>res.json({message:"error in updating the specialization;"}));    
        }
});           

module.exports = router;
