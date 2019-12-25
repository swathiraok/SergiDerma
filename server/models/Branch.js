const mongoose = require("mongoose");

const generateId = require("nanoid/generate");
const nanoid = require("nanoid");

const BranchSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  brnchNme: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pnCde: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  brnchId: {
    type: String,
    default: () => "DKN1" + nanoid(6),
    require: true
  }
});

module.exports = mongoose.model("branch", BranchSchema);
