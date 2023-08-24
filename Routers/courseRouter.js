const express = require("express");
const Login_Signup_Controller = require("../Controllers/courseController");



const router = express.Router();

router.post("/user-signup", Login_Signup_Controller.userSignup);
router.get("/create-course", Course_Controller.createCourse);

module.exports = router;
