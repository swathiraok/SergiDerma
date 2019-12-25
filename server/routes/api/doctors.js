const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator/check");

// Load Doctor model
const Doctor = require("../../models/Doctor");

// @route GET doctors/
// @description Get all doctor
// @access Public
router.get("/", (req, res) => {
  Doctor.find()
    .then(doctors => res.json(doctors))
    .catch(err => res.status(404).json({ nodoctorsfound: "No Doctors found" }));
});

// @route POST doctors/
// @description add  doctor
// @access public
router.post(
  "/",
  [
    check("frstNm", "First name is required!!")
      .not()
      .isEmpty(),
    check("lstNm", "Last name is required!!")
      .not()
      .isEmpty(),
    check("email", "email required")
      .not()
      .isEmpty(),
    check("phnNm", "phoneNumber required ")
      .not()
      .isEmpty(),
    check("spclztion", "specialization is required")
      .not()
      .isEmpty(),
    check("qualification", "qualification is required")
      .not()
      .isEmpty()
  ],
  function(req, res) {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      Doctor.create(req.body)
        .then(doctors => res.json({ message: "Doctor profile saved successfully.." }))
        .catch(err => res.status(500).json(err));
    }
  }
);

// @route GET doctors/
// @description Get All Doctor with pagination
// @access Public 
router.get("/", (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number"
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  // Find some documents
  Doctor.find({}, {}, query, function(err, data) {
    // Mongo command to fetch all data from collection.
    if (err) {
      response = { error: true, message: "Error fetching data" };
    } else {
      response = { error: false, message: data };
    }
    res.json(response);
  });
});

// @route GET doctors/:id
// @description Get single doctor by id
// @access Public
router.get("/:id", (req, res) => {
  Doctor.findById(req.params.id)
    .then(doctor => res.json(doctor))
    .catch(err =>
      res.status(404).json({ msg: " Doctor profile not found.." })
    );
});


// @route put doctors/:id
// @description Update Doctors
// @access Public
router.put("/:id", (req, res) => {
  Doctor.findByIdAndUpdate(req.params.id, req.body)
    .then(doctor => res.json({ msg: "Data updated successfully" }))
    .catch(err =>
      res.status(400).json({ error: "Unable to process request" })
    );
});

// @route GET doctors/:id
// @description Delete doctor by id
// @access Public
router.delete("/:id", (req, res) => {
  Doctor.findByIdAndRemove(req.params.id, req.body)
    .then(doctor => res.json({ mgs: "Doctor entry deleted successfully" }))
    .catch(err => res.status(404).json({ error: "No such doctor exists" }));
});

//  router.post('/photo', (req, res)=>{
//      var newItem = new Item();
//      newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//      newItem.img.contentType = 'image/png';
//      newItem.save();
//  });

module.exports = router;
