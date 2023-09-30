const express = require("express");
const {createUser,loginUser, updateUser,allUser,deleteUser} = require('../controller/userController')
const userrouter = express.Router();
const passport = require('passport')
const {emailval,passwordval} = require('../middleware/validators')
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 default: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       404:
 *         description: Not found
 *     tags:
 *       - User
 */
// emailval,passwordval are the middleware
userrouter.post('/register',emailval,passwordval,createUser );

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a new user
 *     description: login user with username/name and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User loggedin successfully
 *       404:
 *         description: Not found
 *     tags:
 *       - User
 */
userrouter.post('/login',passport.authenticate('local'),loginUser);
userrouter.get("/profile", (req, res) => {
    res.json(req.user);
  });
  
/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout a new user
 *     description: logout user with username
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logout successfully
 *       404:
 *         description: Not found
 *     tags:
 *       - User
 */
  userrouter.post(
    "/logout", 
    (req, res) => {
      req.logout((err) => {
        if (err) {
          console.log("Error while logging out", err);
          return res.json("Error while logging out");
        }
      });
      res.json({ message: "Logged out successfully" });
    }
  );


/**
 * @swagger
 * /api/update/{id}:
 *   put:
 *     summary: Update user information by using ID
 *     description: Update user information for the specified user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the user to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - User
 */ 
userrouter.put('/update/:id',updateUser);

/**
 * @swagger
 * /api/allusers:
 *   get:
 *     summary: Get a list of users with pagination
 *     description: Retrieve a list of users with optional pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: The page number for pagination.
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: resultPerPage
 *         description: The number of results per page for pagination.
 *         schema:
 *           type: integer
 *         required: false
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       400:
 *         description: Bad request, invalid query parameters
 *       500:
 *         description: Internal server error
 *     tags:
 *       - User
 */
userrouter.get('/allusers',allUser);

/**
 * @swagger
 * /api/deleteuser/{id}:
 *   delete:
 *     summary: Delete user information by using ID
 *     description: Delete user information for the specified user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the user to update.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - User
 */ 
userrouter.delete('/deleteuser/:id',deleteUser)
module.exports = userrouter
