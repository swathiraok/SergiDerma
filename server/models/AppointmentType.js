const mongoose = require("mongoose");

const AppointmentTypeSchema = new mongoose.Schema({
    cd :{
        type: String,
        require: true
    },
    Type: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("appointmentType",AppointmentTypeSchema);