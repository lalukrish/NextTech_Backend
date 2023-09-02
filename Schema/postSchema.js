const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    post_title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 500,
    },
    number_likes: {
      type: String,
      default: 0,
    },
    image_url: {
      type: String,
    },
    public_id: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // This should match the name you used when defining the Users model
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
        require: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
