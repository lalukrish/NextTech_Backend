const express = require("express");
const Login_Signup_Controller = require("../Controllers/loginSingupController");
const user_Controller = require("../Controllers/userController.js");
const router = express.Router();

router.post("/create_post", user_Controller.createPost);

// Create an instance of multer with the storage configuration

// Assuming you've configured storage

router.post("/user-signup", Login_Signup_Controller.userSignup);
router.post("/user-signin", Login_Signup_Controller.userSignin);
router.put("/edit-profile", Login_Signup_Controller.editProfile);
router.put("/change-password", Login_Signup_Controller.changePassword);
router.post("/edit-profile-picture", user_Controller.editProfilePicture);
module.exports = router;
