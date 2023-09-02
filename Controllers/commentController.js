const express = require("express");
const router = express.Router();
const Users = require("../Schema/userSchema");
const Posts = require("../Schema/postSchema");
const Comments = require("../Schema/commentSchema");

const Comment_Controller = {
  add_comment: async (req, res) => {
    const postId = req.body.postid;
    const userId = req.body.userid;
    try {
      const newComment = new Comments({
        text: req.body.text,
        author: userId,
        post: postId,
      });

      const savedComment = await newComment.save();

      await Posts.findByIdAndUpdate(postId, {
        $push: { comments: savedComment._id },
      });

      return res
        .status(200)
        .json({ message: "comment add successfully", comment: savedComment });
    } catch (error) {
      return res.status(500).json({ message: "Interanl server error" });
    }
  },

  get_comment: async (req, res) => {
    const postId = req.params.post;

    try {
      const comments = await Comments.find({ post: postId });

      if (!comments || comments.length === 0) {
        return res.status(404).json({ message: "Comments not found" });
      }

      return res.status(200).json({ message: "All Comments are", comments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = Comment_Controller;
