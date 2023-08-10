const bcrypt = require("bcrypt");
const Users = require("../Schema/userSchema");
const Jwt = require("jsonwebtoken");

const AdminRouter = {
  blockUser: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.block) {
        return res.status(200).json({ message: "User is already blocked" });
      }
      user.block = true;
      await user.save();

      return res.status(200).json({ message: "User has been blocked" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error, try again", error });
    }
  },

  unblockUser: async (req, res) => {
    const userId = req.params.userId;
    console.log(
      "🚀 ~ file: loginSingupController.js:7 ~ blockUser ~ userId:",
      userId
    );
    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.block) {
        return res.status(200).json({ message: "User is already unblocked" });
      }
      user.block = false;
      await user.save();

      return res.status(200).json({ message: "User has been unblocked" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error, try again", error });
    }
  },
};

module.exports = AdminRouter;
