const User = require('../model/userModel');
const bcrypt = require("bcrypt");
// const sendEmail = require('../utils/sendEmail')
const hashPassword = require("../middleware/hash")
const getPagination = require("../utils/pagination")
const {emailval,passwordval} = require("../middleware/validators");

// register user
exports.createUser = async(req,res) =>{
    try{
    const {name,email,password} = req.body;
    const passcheck = passwordval(password);
    const emailcheck = emailval(email) 

    // sendgrid process
    // const from = 'gau963191@gmail.com';
    // const to = 'gridharkumar279@gmail';
    // const subject ="checking";
    // const text = "hello gaurav"

    if(!name || !email || !password)
    {
        return res.json({
            message:"Insufficient information provided"
        })
    }

    if(!passwordval(password).includes("strong"))
    {
        return res.json({
            message: passcheck
        });    
    }
    if(!emailcheck)
    {
        return res.json({
             message:"email is not valid email"
        })
    }

    const hashedPassword = await hashPassword(password);

    const duplicateuser = await User.findOne({email})
    if(duplicateuser)
    {
        return res.json({
            message:"user exist with this email"
        })
    }
    try{
        const newUser = await User.create({ name, email, password:hashedPassword });

        // email process
        // await sendEmail(to,from,subject,text);

        return res.status(201).json({
            message: "User registered successfully",
            newUser: {
                name: newUser.name,
                email: newUser.email,
            }
        });
    }
    
    // handle the error when duplicate name is coming at the time of registration
     catch (error) {
        if (error.code === 11000) {
            return res.json({
                message: "User with this name already exists"
            }).status(409);
        }
        return res.json({
            error,
            message: "Error while registration"
        }).status(500);
    }
}

catch(error){
    res.json({
        error,
        message:"error while registration"
    }).status(404)
}
}

// login user

exports.loginUser = async(req,res) =>{
 
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.json({
                message:"not a valid credentials"
            })
        }
        const hashed = await bcrypt.compare(password,user.password)
        if(hashed)
        { 
            return res.json({
                message:"user loggedIn successfully",
                email
            })
        }
          return res.json({
            message:"not a valid emailId or password",
            hashed
          }).status(400)
    }
    catch(error)
    {
      return res.json({
        message:"unknown error"
      }).status(404)
    }
    
}

// update user details

exports.updateUser = async(req,res) =>{
    const userId = req.params.id;
    const{name,email} = req.body;
    try{
        const user= await User.findById(userId)
        if(!user)
        {
            return res.json({
                message:"not a valid id"
            }).status(400)
        }
    
        if(name)
        {
            user.name = name;
        }
        if(email)
        {
            user.email=email;
        }
       user.save();
       res.json({
        message:"user details updated"
       }).status(200)
    }
    catch(error)
    {
      res.json({
        message:"unknown error"
      }).status(404)
    }
}

// get all the users

exports.allUser = async(req,res) =>{
       
    const page = parseInt(req.query.page) || 1;
    const resultPerPage = parseInt(req.query.resultPerPage) || 2;
    try{

        // here i have used projection
        const projection = {name:1,email:1,_id:0}
        const result = await getPagination(resultPerPage,page,projection)
        if(!result)
        {
            res.json({
                message:"no user found"
            }).status(400) 
        }
        res.json({
            result
        }).status(200)
    }catch(error){
        res.json({
            message:"unknown error"
        }).status(401)
    }
    
}

// delete a user
exports.deleteUser = async(req,res) =>{
    const userId = req.params.id;
    try{

        const user = await User.findById(userId);
        if(!user)
        {
            res.json({
                message:"user not found"
            }).status(401)
        }
       await User.deleteOne({_id:userId});
        res.json({
            message:"user deleted successfully"
        }).status(200)
    }catch(error){
        error
  
    }
}

// upload file using multer
exports.fileUpload = async(req,res) =>{
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