import bcrypt from "bcrypt";
import Users from "../Schema/userSchema";
export const Login_Signup_Controller = {
  userSignup: async (req, res) => {
    try {
      const userEmail = await Users.findOne({
        email: req.body.eamil.toLowerCase(),
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
        res.status(409).json({ message: "user name is already exists" });
      } else {
        const password = req.bod.password;
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
      console.log(
        "🚀 ~ file: loginSingupController.js:7 ~ userSignup ~ err:",
        error
      );
    }
  },
  userSignin: async (req, res) => {},
};
