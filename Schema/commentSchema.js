const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to a User model
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts", // Reference to a Post model
    required: true,
  },
  replies: [
    {
      reply_text: {
        type: String,
        required: true,
      },
      reply_likes: {
        type: Number,
        default: 0,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", // Reference to a User model
        required: true,
      },
    },
  ],
});

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;
