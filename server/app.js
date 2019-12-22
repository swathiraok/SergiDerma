// app.js

const express = require("express");
const connectDB = require("./config/db");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
var cors = require("cors");

// routes
//const books = require("./routes/api/books");
const documents = require("./routes/api/document");

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
app.use("/api/uploads", documents);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
