const  fs =require('fs').promises;
const path = require("path")
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
   
//    read file
   exports.getFile = async(req,res) =>{
    const path_dir = path.join('/','home','gaurav','Desktop','crud-api','uploads')
       try{
           const filen = await fs.readdir(path_dir)
           res.json({
               filen
            
           })
       }
       catch(error)
       {
        console.log(error)
          res.json({
           message:"Error while reading files"
          })
       }
   }