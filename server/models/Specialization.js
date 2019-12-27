const mongoose = require("mongoose");
const generateID = require("nanoid/generate");
const nanoid = require("nanoid");

const SpecilizationSchema = new mongoose.Schema({
    cd :{
        type:String,
        default :() => "splzation" + nanoid(3),
        required: true
    },
    name:{
        type: String,
        required: true

    },
    description:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("speclization", SpecilizationSchema);
