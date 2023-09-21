const express = require("express");
const {fileUpload,getFile,deleteFile} = require('../controller/fileController')
const filerouter = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,(`${Date.now()}-${file.originalname}`).slice(11,))
    }
  })
const upload = multer({storage})

/**
 * @swagger
 * /api/file/upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server using FormData.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request, missing or invalid file
 *       500:
 *         description: Internal server error
 *     tags:
 *       - File
 */
filerouter.post('/upload',upload.single("file"),fileUpload)

/**
 * @swagger
 * /api/file/getfiles:
 *   get:
 *     summary: Get a list of files
 *     description: Retrieve a list of files.
 *     responses:
 *       200:
 *         description: List of files retrieved successfully
 *       500:
 *         description: Internal server error
 *     tags:
 *       - File
 */

filerouter.get('/getfiles',getFile)

/**
 * @swagger
 * /api/file/deletefile/{id}:
 *   delete:
 *     summary: Delete file information by using ID
 *     description: Delete file information 
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the file to update.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: file deleted successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       404:
 *         description: file not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - File
 */ 
filerouter.delete('/deletefile/:id',deleteFile);

module.exports = filerouter