const express = require("express");


const router = express.Router();
const {registerUser, loginUser, getUser}=require("../controller/authController");
const {protect}=require('../middlewere/authmiddkeware');
const {admin}=require('../middlewere/adminmiddlewere')



router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/user",protect,admin,getUser);

module.exports = router;
