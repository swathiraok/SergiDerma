const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    drNm: {
        type: String,
        required: true
      },
      ptNm: {
        type: String,
        required: true
      },
      ptNm: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      }
  });
  
  module.exports = mongoose.model("appointment", AppointmentSchema);