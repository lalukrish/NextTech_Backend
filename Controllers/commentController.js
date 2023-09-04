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
  add_reply: async (req, res) => {
    const commentId = req.body.commentId;
    try {
      const parentComment = await Comments.findById(commentId);
      const newReply = {
        reply_text: req.body.reply_text,
        author: req.body.userId,
      };
      parentComment.replies.push(newReply);
      const savedComment = await parentComment.save();
      return res.status(200).json({ message: "Sucessfully", savedComment });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  add_like: async (req, res) => {
    const postId = req.body.postid;
    const userId = req.body.userid;
    console.log("userid", userId, "postid", postId);

    try {
      const post = await Posts.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "No post found" });
      }

      if (post.likedBy.includes(userId)) {
        return res
          .status(400)
          .json({ message: "User has already liked the post" });
      }

      post.number_likes = (parseInt(post.number_likes) || 0) + 1;
      post.likedBy.push(userId);

      await post.save();

      return res.status(200).json({ message: "User Liked" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error });
    }
  },

  get_no_of_like: async (req, res) => {
    const postId = req.params.postId;
    try {
      const post = await Posts.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "No Post found" });
      }
      no_of_likes = post.number_likes || 0;
      return res
        .status(200)
        .json({ message: "Number of likes ", no_of_likes: no_of_likes });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error });
    }
  },
};

module.exports = Comment_Controller;
