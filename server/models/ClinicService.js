const mongoose = require("mongoose");
const generateId = require("nanoid/generate");
const nanoid = require("nanoid");

const ClinicServiceSchema = new mongoose.Schema({
    cd: {
        type: String,
        default : () => "cService" + nanoid(3),
        required: true
    },
    Type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("clinicService", ClinicServiceSchema);