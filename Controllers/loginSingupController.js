import Users from "../Schema/userSchema";
export const Login_Signup_Controller = {
  userSignup: async (req, res) => {
    try {
      const userEmaill = await Users.findOne({
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
