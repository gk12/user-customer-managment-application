const  fs =require('fs').promises;
const path = require("path")
const User = require('../model/userModel');
const File = require('../model/fileModel');

function filedetail(file){
 const filedetails = [];
 const filename = file.filename;
 const originalname = file.originalname
 const size = file.size
 filedetails.push({filename,originalname,size})
 return filedetails
}
function user1(req){
  const user = req.session.passport.user;
  return user;
}
// upload file using multer
exports.fileUpload = async(req,res) =>{

    const username = user1(req);
    const user = await User.findOne({username});
    const userId = user._id;
    const file = filedetail(req.file)
    const  filename = file[0].filename;
    const originalname = file[0].originalname;
    const size = file[0].size;

    await File.insertMany({filename,originalname,size,userId});
    // const filename = file
    //If no file found
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

  //  delete file form upload folder and database
   exports.deleteFile = async(req,res)=>{
    const fileId = req.params.id;
    try {
        const file = await File.findById(fileId);
        if(!file)
        {
          res.end('Not a valid file id')

        }
        const path = `/home/gaurav/Desktop/crud-api/uploads/${file.filename}`;

        // unlink is used to delete the file form directory
        fs.unlink(path);
        await File.deleteOne({_id:fileId});
        res.json({
          message:"File deleted successfully"
        }).status(200);

    } catch (error) {
      res.json({
        message:"Error while deleting file"
      }).status(500)
    }
   }