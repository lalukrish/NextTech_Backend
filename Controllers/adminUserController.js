const bcrypt = require("bcrypt");
const Users = require("../Schema/userSchema");
const Jwt = require("jsonwebtoken");
const Posts = require("../Schema/postSchema");

const AdminRouter = {
  getAllUser: async (req, res) => {
    try {
      const skip = req.query.skip ?? 0;
      const users = await Users.find();
      console.log("urers", users);
      return res.status(200).json({ message: "get all users", users: users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server error,Try again later" });
    }
  },
  getSingleUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log("userid", userId);
      const user = await Users.findOne({ _id: userId });
      const posts = await Posts.find({ user: userId }); // Specify the query to find by ID
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User details", user: user, posts: posts });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },

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

  makeAdmin: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.admin) {
        return res
          .status(200)
          .json({ message: "This user is already a admin" });
      }
      user.admin = true;
      await user.save();

      return res.status(200).json({ message: "Now this user is an admin" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error, try again", error });
    }
  },

  unmakeAdmin: async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      if (!user.admin) {
        return res
          .status(200)
          .json({ message: "This Admin is changed to User" });
      }
      user.admin = false;
      await user.save();

      return res.status(200).json({ message: "User is only a user" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error, try again", error });
    }
  },
};

module.exports = AdminRouter;
