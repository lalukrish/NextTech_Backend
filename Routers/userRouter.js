const express = require("express");
const Login_Signup_Controller = require("../Controllers/loginSingupController");

const router = express.Router();

router.post("/user-signup", Login_Signup_Controller.userSignup);
router.post("/user-signin", Login_Signup_Controller.userSignin);
router.get("/get-all-users", Login_Signup_Controller.getAllUser);
router.get("/get-one-user/:userId", Login_Signup_Controller.getSingleUser);
router.put("/edit-profile", Login_Signup_Controller.editProfile);
router.put("/change-password", Login_Signup_Controller.changePassword);

module.exports = router;
