const mongoose = require("mongoose");

const AppointmentStateSchema = new mongoose.Schema({
    cd :{
        type: String,
        require: true
    },
    Type: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("appointmentState",AppointmentStateSchema);