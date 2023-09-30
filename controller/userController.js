const User = require('../model/userModel');
const Role = require('../model/roleModel');
const bcrypt = require("bcrypt");
// const sendEmail = require('../utils/sendEmail')
const hashPassword = require("../middleware/hash")
const getPagination = require("../utils/pagination")
const logger = require('../utils/logger')
// register user
exports.createUser = async(req,res) =>{
    try{
    const {username,name,email,password,role} = req.body;

    // sendgrid process
    // const from = 'gau963191@gmail.com';
    // const to = 'gridharkumar279@gmail';
    // const subject ="checking";
    // const text = "hello gaurav"

    if(!username || !name || !email || !password)
    {
        return res.status(404).json({
            message:"Insufficient information provided"
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

        // user having two roles (user,admin)
        const roleId = await Role.findOne({role});
        const newUser = await User.create({ username,name, email, password:hashedPassword,role:roleId._id });

        // email process
        // await sendEmail(to,from,subject,text);

        return res.status(201).json({
            message: "User registered successfully",
            newUser: {
                username:newUser.username,
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
        const {username,password} = req.body; 
        const user = await User.findOne({
            $or: [{ username: username }, { email: username }],
          });
        if(!user)
        {
            return res.status(401).json({
                message:"not a valid credentials"
            })
            // logger.info('not a valid user')
        }
        const hashed = await bcrypt.compare(password,user.password)
        if(hashed)
        { 
            return res.status(200).json({
                message:"user loggedIn successfully",
                username
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
    
    // concept of pagination
    const page = parseInt(req.query.page) || 1;
    const resultPerPage = parseInt(req.query.resultPerPage) || 2;

    // find username from session
    const username = req.session.passport.user;
    try{

        const user_details = await User.findOne({username}).populate('role');
        if(user_details.role.role !== 'admin')
        {
            return res.json({
                message:"not a authenticated user"
            })
        }

        // here i have used projection
        const projection = {name:1,email:1,_id:1}
        const result = await getPagination(resultPerPage,page,projection)
        if(!result)
        {
            return res.json({
                message:"no user found"
            }).status(400) 
        }
        return res.json({
            result
        }).status(200)
    }catch(error){
        return res.json({
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
            logger.warn('user not found')
            return res.json({
                message:"user not found"
            }).status(401)
        }
       await User.deleteOne({_id:userId});
    //    used logger here
       logger.info(`User ${user.name} deleted successfully`);
        res.json({
            message:"user deleted successfully"
        }).status(200)
    }catch(error){
        logger.error('Error while deleting user')
        return res.json({
            meesage:'something went wrong'
        }).status(500)
    }
}