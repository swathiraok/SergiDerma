const express = require("express");
const router = express.Router();

// Load Branch model
const Branch = require("../../models/Branch");

// @route GET branches/
// @description add/save branch
// @access Public
router.post("/", (req, res) => {
  Branch.create(req.body)
    .then(book => res.json({ msg: "Branch added successfully" }))
    .catch(err => res.status(400).json({ error: "Unable to add this Branch" }));
});

// @route GET branches/
// @description Get All branches with pagination
// @access Public
router.get("/", (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1"
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  // Find some documents
  Branch.find({}, {}, query, function(err, data) {
    // Mongo command to fetch all data from collection.
    if (err) {
      response = { error: true, message: "Error fetching data" };
    } else {
      response = { error: false, message: data };
    }
    res.json(response);
  });
});

module.exports = router;
