// app.js

const express = require("express");
const connectDB = require("./config/db");
const logger = require("./config/logger")
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
var cors = require("cors");

// routes
const branches = require("./routes/api/branches");
const patients = require("./routes/api/patients");
const doctors = require("./routes/api/doctors");
const patientBasicInfo = require("./routes/api/patientBasicInformations");
const clinicServices = require("./routes/api/clinicService");
const specialization = require("./routes/api/specialization");
const appointmentType = require("./routes/api/appointmentType");
const appointmentState = require("./routes/api/appointmentState");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use("/branches", branches);
app.use("/patients", patients);
app.use("/doctors", doctors);
app.use("/patientBasicInfo", patientBasicInfo);
app.use("/clinicService", clinicServices);
app.use("/specialization", specialization);
app.use("/appntType",appointmentType)
app.use("/appntState",appointmentState);

const port = process.env.PORT || 8082;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)});
