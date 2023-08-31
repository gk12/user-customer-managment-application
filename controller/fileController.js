const  fs =require( 'fs/promises');
const path = require("path")
const fsPromises = require('fs').promises;
// upload file using multer
exports.fileUpload = async(req,res) =>{
    //If no file found
    console.log(req.file)
    if (!req.file) {
       return res.status(400).send("No such file uploaded.");
     }
   
     try {
       // if there is file
       const uploadedFile = req.file;
   
       // we can store the path of file into database not the url of the file.
       // it will helpful when we want to fetch file from the database
       // console.log(uploadedFile)
       res.send("File uploaded successfully.");
     } catch (err) {
       console.log(err);
       res.send("Error uploading").status(404);
     }
   }
   
   exports.getFile = async(req,res) =>{
       const path_dir = path.join('home','gaurav','Desktop','crud-api','uploads')
       console.log(path_dir)
       try{
        console.log(filen)

           const filen = await fsPromises.readdir(path_dir)
           res.json({
               files:filen
           })
       }
       catch(error)
       {
          res.json({
           message:"Error while reading files"
          })
       }
   }