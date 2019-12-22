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

/*
//@route post /uploads
//@desc uploads the file to database 
//router.post('/upload', upload.single('file'), (req, res) =>{
router.post('/upload', (req, res) =>{
    upload.single(req, res, function(err){
        if(err){
            return res.status(404).json({ message: "error in uploading file"});
        }
        res.json({ message : "file uploaded successful"});
    });
});
*/

//@route post /uploads
//@desc uploads the file to database 
router.post('/upload', upload.single('file'), (req, res) =>{
   
    return res.json("file uploaded successfully!..")
})
/*
//@route post /uploads
//@desc uploads the file to database 
router.post('/upload', upload.single('file'), (req, res, function(err){
    if (err) {
        return res.status(404).json({ message: 'error in uploading file'});
    }
    res.json({ message: 'file uploaded successfully '})
    
}));
*/

/**route GET /files
 * @desc method to Display all the files in the json format 
 */
router.get('/files',(req, res)=>{
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

module.exports = router;