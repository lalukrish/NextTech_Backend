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
      bcrypt.compare(password, currentPassword, async function (err, result) {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        } else {
          const token = Jwt.sign(
            {
              _id: username_or_email?._id ?? with_username?._id,
            },
            process.env.JWT
          );
          return res
            .status(200)
            .json({ message: "Login successfull", token: token });
        }
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "internal server error,try again" });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await Users.find();
      console.log("urers", users);
      return res.status(200).json({ message: "get all users", users: users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server error,Try again later" });
    }
  },
};
module.exports = Login_Signup_Controller;
