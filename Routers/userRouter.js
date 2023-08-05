import express from "express";

import { Login_Signup_Controller } from "../Controllers/loginSingupController";

const router = express.Router();

router.post("/user-signup", Login_Signup_Controller.userSignup);
