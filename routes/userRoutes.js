const express = require("express");
const {createUser,loginUser, updateUser,allUser,deleteUser,fileUpload} = require('../controller/userController')
const router = express.Router();
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}-${file.originalname}`)
    }
  })
const upload = multer({storage})
router.post('/register',createUser);
router.post('/login',loginUser);
router.put('/update/:id',updateUser);
router.get('/allusers',allUser);
router.delete('/deleteuser/:id',deleteUser)
router.post('/file/upload',upload.single("file"),fileUpload)
module.exports = router
