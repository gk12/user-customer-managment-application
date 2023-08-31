const express = require("express");
const {createUser,loginUser, updateUser,allUser,deleteUser} = require('../controller/userController')
const userrouter = express.Router();
// const multer = require("multer")
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null,`${Date.now()}-${file.originalname}`)
//     }
//   })
// const upload = multer({storage})
userrouter.post('/register',createUser);
userrouter.post('/login',loginUser);
userrouter.put('/update/:id',updateUser);
userrouter.get('/allusers',allUser);
userrouter.delete('/deleteuser/:id',deleteUser)
module.exports = userrouter
