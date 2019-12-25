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

/**
 * @description storage engine to upload the file.
 */
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


/**
 * @route post /documents
 * @description post method to upload files
 * @access public 
 */
router.post('/', upload.single('file'), (req, res) =>{

    //res.json({ file: req.file})
   
    return res.json("file uploaded successfully!..")
});




/**
 * route GET /files
 * @desc get method to reterive the file in json format
 * for testing in postman
 */
router.get('/',(req, res)=>{
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
 * @route /:filename
 * @desc get method to reterive the single file based on filename.
 * @access public 
 * testing in postman only  
 */
router.get('/:filename', (req, res) => {
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
 * router /:filename
 * @description get method to download file based on filename 
 * @access public
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