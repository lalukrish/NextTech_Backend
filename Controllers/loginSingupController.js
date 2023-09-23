const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../Schema/userSchema");
const Jwt = require("jsonwebtoken");

const Login_Signup_Controller = {
  userSignup: async (req, res) => {
    try {
      const userEmail = await Users.findOne({
        email: req.body.email.toLowerCase(),
      });

      const userName = await Users.findOne({
        user_name: req.body.user_name.toLowerCase(),
      });
      const phoneNumber = await Users.findOne({
        phone_number: req.body.phone_number,
      });
      if (userEmail) {
        res.status(409).json({ message: "user email already exists" });
      } else if (userName) {
        res.status(409).json({ message: "user name is already exists" });
      } else if (phoneNumber) {
        res
          .status(409)
          .json({ message: "user phone number is already exists" });
      } else {
        const password = req.body.password;

        const hashvalue = 12;
        const hashedPassword = await bcrypt.hash(password, hashvalue);

        const data = {
          full_name: req.body.full_name,
          email: req.body.email.toLowerCase(),
          user_name: req.body.user_name.toLowerCase(),
          country_code: req.body.country_code,
          phone_number: req.body.phone_number,
          password: hashedPassword,
        };

        const newUser = new Users(data);
        try {
          const saved = await newUser.save();
          const user_id = saved?._id;
          return res
            .status(200)
            .json({ message: "user signup successfull", user_id: user_id });
        } catch (error) {
          return res.status(400).json({ message: "Singup failed,Try again" });
        }
      }
    } catch (error) {
      // console.log(
      //   "🚀 ~ file: loginSingupController.js:7 ~ userSignup ~ err:",
      //   error
      // );
      return res.status(500).json({ message: "Server error,try again", error });
    }
  },
  userSignin: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(401)
        .json({ message: "Login failed!Invalid credential" });
    }
    try {
      const with_email = await Users.findOne({
        email: req.body.email.toLowerCase(),
      });
      const with_username = await Users.findOne({
        user_name: req.body.email.toLowerCase(),
      });

      const username_or_email = with_email ? with_email : with_username;

      const password = req.body.password;
      if (!username_or_email) {
        return res
          .status(401)
          .json({ message: "Login Failed!Invalid Email or UserName" });
      }
      const currentPassword =
        username_or_email?.password ?? with_username?.password;

      if (!bcrypt.compareSync(password, currentPassword)) {
        return res
          .status(401)
          .json({ message: "Login Failed! Incorrect password" });
      }
      const token = Jwt.sign(
        {
          _id: username_or_email?._id ?? with_username?._id,
        },
        process.env.JWT
      );
      return res.status(200).json({
        message: "Login successfull",
        token: token,
        user: username_or_email,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "internal server error,try again" });
    }
  },

  editProfile: async (req, res) => {
    const userId = req.body.id;

    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const full_name = req.body.full_name;
      const role = req.body.role;
      const bio_information = req.body.bio_information;
      const updateUser = await Users.findByIdAndUpdate(userId, {
        full_name: full_name,
        role: role,
        bio_information: bio_information,
      });

      if (!updateUser) {
        return res.status(404).json({ message: "User not updated" });
      }
      console.log("usefeUser", updateUser);
      return res.status(200).json({
        message: "User successfully updated",
        updatedUser: updateUser,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error, try again", error: error.message });
    }
  },

  changePassword: async (req, res) => {
    const userId = req.body.id;

    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;

      // Compare current password with the stored hashed password
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }

      // Hash and update the new password
      const hashvalue = 12;
      const hashedNewPassword = await bcrypt.hash(newPassword, hashvalue);
      user.password = hashedNewPassword;

      // Save the updated user data
      const updatedUser = await user.save();

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error, try again", error });
    }
  },
};
module.exports = Login_Signup_Controller;
