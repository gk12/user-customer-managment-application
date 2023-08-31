const express = require("express");
const {fileUpload,getFile} = require('../controller/fileController')
const filerouter = express.Router()
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

filerouter.post('/upload',upload.single("file"),fileUpload)
filerouter.get('/getfiles',getFile)

module.exports = filerouter