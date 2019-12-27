// app.js

const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");

// routes
const clinicAdd = require("./routes/api/clinicAddr");
const clinicTiming = require("./routes/api/clinicTiming");
const clinicHolyday = require("./routes/api/clinicHolyday");
const leaveCalender = require("./routes/api/leaveCalender");
const doctorInfor = require("./routes/api/doctorInfor");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

// use Routes
app.use("/api/clinicaddr",clinicAdd);
app.use("/api/clinicTiming",clinicTiming);
app.use("/api/clinicholyday",clinicHolyday);
app.use("/api/leaveCalender",leaveCalender);
app.use("/api/doctorInfo",doctorInfor);



const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
