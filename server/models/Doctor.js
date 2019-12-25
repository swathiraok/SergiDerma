const mongoose = require("mongoose");
const generateId = require("nanoid/generate");
const nanoid = require("nanoid");

const DoctorSchema = new mongoose.Schema({
  frstNm: {
    type: String,
    required: true
  },
  lstNm: {
    type: String,
    required: true
  },
  midlNm: {
    type: String,
    required: true
  },
  spclztion: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  phnNm: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    required: true
  },
  dctrId: {
    type: String,
    default: () => "DKN1" + nanoid(6),
    require: true
  },
  hsptlNm: {
    type: String,
    required: true
  }
  // img:{
  //   data: Buffer,
  //   type: String
  // }
});

module.exports = mongoose.model("doctor", DoctorSchema);
