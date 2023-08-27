const express = require("express");
const {createUser,loginUser, updateUser,allUser,deleteUser} = require('../controller/userController')
const router = express.Router();

router.post('/register',createUser);
router.post('/login',loginUser);
router.put('/update/:id',updateUser);
router.get('/allusers',allUser);
router.delete('/deleteuser/:id',deleteUser)

module.exports = router
