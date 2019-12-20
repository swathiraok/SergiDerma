// app.js

const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");

// routes
const books = require("./routes/api/books");
const patients = require("./routes/api/patients");
const patientsInfor = require("./routes/api/patientInformation");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

// use Routes
app.use("/api/books", books);
app.use("/api/patients",patients);
app.use("/api/patientsInfor",patientsInfor);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
