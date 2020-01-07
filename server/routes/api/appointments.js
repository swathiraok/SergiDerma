const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
var dateFormat = require("dateformat");
//load patient model
const Appointment = require("../../models/Appointment");

//@route create appointments/
//@description create appointments
//public access
router.post(
  "/",
  [
    check("drNm", "Doctor name is required!!")
      .not()
      .isEmpty(),
    check("ptNm", "Patient name is required!!")
      .not()
      .isEmpty(),
    check("date", "Date is required!!")
      .not()
      .isEmpty(),
    check("time", "Time is required!!")
      .not()
      .isEmpty()
  ],
  function(req, res) {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      Appointment.create(req.body)
        .then(appointment =>
          res.json({
            message: "Appointment booked successfully..",
            status: "200"
          })
        )
        .catch(err => res.status(500).json(err));
    }
  }
);

//@route get appointments/
//@description get all appointments by todays date
//public access
router.get("/", (req, res) => {
  var now = new Date();
  var datenow = dateFormat(now, "yyyy-mm-dd");
  var query = { date: datenow };
  var mysort = { time: 1 };
  Appointment.find(query)
    .sort(mysort)
    .then(appointment => res.json(appointment))
    .catch(err => res.status(404).json({ error: "Unable to find!!" }));
});


//@route get upcoming appointments/
//@description get all appointments by todays date
//public access
router.get("/upcoming", (req, res) => {
  var now = new Date();
  var datenow = dateFormat(now, "yyyy-mm-dd");
  var query = { date: {$gt: datenow} };
  var mysort = { time: 1 };
  Appointment.find(query)
    .sort(mysort)
    .then(appointment => res.json(appointment))
    .catch(err => res.status(404).json({ error: "Unable to find!!" }));
});
module.exports = router;
