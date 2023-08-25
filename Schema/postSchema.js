const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  post_title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  number_likes: {
    type: String,
  },
  image_url: {
    type: String,
  },
  public_id: {
    type: String,
  },
});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
