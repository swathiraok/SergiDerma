const express =  require("express");
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// Mongo URI //using MLabs
const mongoURI = 'mongodb://localhost:27017/sergiderma';


// create a mongo connection which is 
const conn = mongoose.createConnection(mongoURI);

//init gfs 
let gfs;

conn.once('open',() => {
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
});

//create a storage engine s
const storage = GridFsStorage({ 
    url: mongoURI,
    file: (req, file) =>{
        return new Promise((resolve, reject) =>{
            const filename = file.originalname;
            const fileInfo = {
                //filename: 'file_'+ Date.now(),
                filename:filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });

    }
});

const upload = multer({ storage})


router.get("/", (req, res) => {
    res.render("index")
})

//@route post /uploads
//@desc uploads the file to database 
router.post('/upload', upload.single('file'), (req, res) =>{

    //res.json({ file: req.file})
   
    return res.json("file uploaded successfully!..")
});




/**route GET /files
 * @desc method to get all the files in the json format 
 */
router.get('/getAllFiles',(req, res)=>{
    gfs.files.find().toArray((err, files)=>{
        //checl if files exists
        if(!files || files.length === 0){
            return res.status(404).json({
                err:'No files exist'
            });
        }

        //Files exist
        return res.json(files);
    });
});

/**
 * router files/:filename
 * @description method to fetch the particular file using the filename in json format
 *    (display single file)
 */
router.get('/getByFilename/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.param.filename}, (err, file) => {
        //checking if file exists
        if(!files || files.length === 0){
            return res.status(404).json({
                err:'no file exists in that name'
            });
        }
        //file exists
        return res.json(file)

    })
})

/**
 * router files/:filename
 * @description method to download the particular file using the filename 
 */
router.get("/files/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename}, (err, file)=> {
        //checking if file exists
        if(!files || files.length === 0){
            return res.status(404).json({ 
                err: "no files exists"
        });
    }
    gfs.openDownloadStreamByName(req.params.filename)
});
});

module.exports = router;    