// app.js

const express = require("express");
// const multer = require('multer')
const connectDB = require("./config/db");
var cors = require("cors");

// routes
//const books = require("./routes/api/books");
const doctorsApi = require("./routes/api/doctorProfiles");
const branchs = require("./routes/api/branchs");
const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

// use Routes
//app.use("/api/books", books);
app.use("/doctors", doctorsApi);
app.use("/branchs",branchs);
// app.use(multer({ dest: './uploads', 
// rename:function(fieldname, filename){
//     return filename;
// },
// }));


 
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));