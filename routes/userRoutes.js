const express = require("express");
const {createUser,loginUser, updateUser,allUser,deleteUser} = require('../controller/userController')
const userrouter = express.Router();
const passport = require('passport')
const initalizingPassport = require('../passport/initsession')

initalizingPassport(passport)
// userrouter.use(passport.initialize());
// userrouter.use(passport.session());
userrouter.post('/login',passport.authenticate('local'),loginUser);
userrouter.get("/profile", (req, res) => {
    res.json(req.user);
  });
  
  
//user logout route
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
  
userrouter.post('/register',createUser);
userrouter.put('/update/:id',updateUser);
userrouter.get('/allusers',allUser);
userrouter.delete('/deleteuser/:id',deleteUser)
module.exports = userrouter
