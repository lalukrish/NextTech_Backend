const express = require("express");
const Login_Signup_Controller = require("../Controllers/loginSingupController");

const userRouter = express.Router();

userRouter.post("/user-signup", Login_Signup_Controller.userSignup);
userRouter.post("/user-signin", Login_Signup_Controller.userSignin);
userRouter.get("/get-all-users", Login_Signup_Controller.getAllUser);
userRouter.get("/get-one-user/:userId", Login_Signup_Controller.getSingleUser);

module.exports = userRouter;
