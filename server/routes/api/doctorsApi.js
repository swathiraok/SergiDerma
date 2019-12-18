const express = require("express");
const router = express.Router();



// Load Doctor model
const Doctor = require("../../models/Doctor");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("book route testing!"));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {   
  Doctor.find()
    .then(doctors => res.json(doctors))
    .catch(err => res.status(404).json({ nodoctorsfound: "No Doctors found" }));
});
// @route POST api/doctor/add
// @description add  doctor
// @access public
router.post("/add", (req, res) => {
  //let email = req.body.email;  
console.log("email are the response "+req.body.email);
 
  Doctor.create(req.body)
    .then(doctor => res.json({ message: "successfully created" }))
    .catch(err => res.status(400).json({ error: "Unable to add this Doctor" }));
}); 
 

// @route GET api/doctor/:id
 // @description Get single book by id
 // @access Publicnpm install express-validator
 router.get("/:id", (req, res) => {
  Doctor.findById(req.params.id)
     .then(doctor => res.json(doctor))
     .catch(err => res.status(404).json({ nobookfound: "No Book found" }));
 });
 

 // @route GET api/books/:id
 // @description Update book
 // @access Public
 router.put("/:id", (req, res) => {
  Doctor.findByIdAndUpdate(req.params.id, req.body)
     .then(doctor => res.json({ msg: "Updated successfully" }))
     .catch(err =>
       res.status(400).json({ error: "Unable to update the Database" })
     );
});

 // @route GET api/books/:id
 // @description Delete book by id
 // @access Public
 router.delete("/:id", (req, res) => {
  Doctor.findByIdAndRemove(req.params.id, req.body)
     .then(doctor => res.json({ mgs: "Doctor entry deleted successfully" }))
     .catch(err => res.status(404).json({ error: "No such a Doctor" }));
 });

module.exports = router;