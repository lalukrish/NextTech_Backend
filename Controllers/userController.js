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
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const profileImage = new Users({
        profile_image_url: result.url,
        profile_image_public_id: result.public_id,
      });
      await profileImage.save();
      await fs.unlink(req.path.file);
      return res
        .status(200)
        .json({ message: "profile picture update successfully" });
    } catch (error) {
      res.status(500).json({ message: "Interanl server error", error: error });
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
};

module.exports = user_Controller;
