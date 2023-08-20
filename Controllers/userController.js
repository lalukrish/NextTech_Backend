const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const cloudinary = require("cloudinary");
const Posts = require("../Schema/postSchema");
const Users = require("../Schema/userSchema");
cloudinary.config({
  cloud_name: "dvjjzsilz",
  api_key: "429616765262767",
  api_secret: "IeJEnUVczERLFF5eOFiS18kenIE",
});

const user_Controller = {
  editProfilePicture: async (req, res) => {
    const userId = req.body.id;

    try {
      // Find the user by their ID
      const user = await Users.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Upload the image to Cloudinary
      const imageResult = await cloudinary.v2.uploader.upload(req.file.path);

      // Update the user's profile image fields
      user.profile_image_url = imageResult.url;
      user.profile_image_public_id = imageResult.public_id;

      // Save the updated user object
      await user.save();

      // Delete the temporarily uploaded file
      await fs.unlink(req.file.path);

      return res
        .status(200)
        .json({ message: "Profile picture updated successfully" });
    } catch (error) {
      console.error("Internal server error", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  },

  createPost: async (req, res) => {
    const { post_title, description } = req.body;
    try {
      //save image in cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const newPost = new Posts({
        post_title,
        description,
        image_url: result.url,
        public_id: result.public_id,
      });
      await newPost.save();
      await fs.unlink(req.file.path);
      res
        .status(200)
        .json({ message: "image uploaded success fully", post: newPost });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
  getProfilePicture: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await Users.findById(userId);
      data = {
        profile_image_url: user.profile_image_url,
        profile_image_public_id: user.profile_image_public_id,
      };
      return res
        .status(200)
        .json({ message: "user profile image data", data: data });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = user_Controller;
