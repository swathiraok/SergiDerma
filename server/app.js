// app.js

const express = require("express");
const { handleError,ValidaError } = require('./CenterErrorHandle/error')
const connectDB = require("./config/db");
var cors = require("cors");
var path = require('path'); 

//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// routes
const clinicAdd = require("./routes/api/clinicAddr");
const clinicTiming = require("./routes/api/clinicTiming");
const clinicHolyday = require("./routes/api/clinicHolyday");
const leaveCalender = require("./routes/api/leaveCalender");
const doctorInfor = require("./routes/api/doctorInfor");
const mailSender = require("./routes/api/mailSender");
const patients = require("./routes/api/patients");
const patientBasicInfor = require("./routes/api/patinetBasicInformation");


const app = express();



// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static("template"));

app.get("/", (req, res) => res.send("Hello world!"));

// use Routes
app.use("/api/clinicAddr",clinicAdd);
app.use("/api/clinicTiming",clinicTiming);
app.use("/api/clinicholyday",clinicHolyday);
app.use("/api/leaveCalender",leaveCalender);
app.use("/api/doctorInfo",doctorInfor);
app.use("/api/mailSender",mailSender);
app.use("/api/patients",patients);
app.use("/api/patientBasicInfor",patientBasicInfor);


app.get('/error', (req, res) => {
    throw new ValidaError(500, 'Internal server error')
  })

const port = process.env.PORT || 8082;

app.use((err, req, res, next) => {
    handleError(err, res);
  });

app.listen(port, () => console.log(`Server running on port ${port}`));
