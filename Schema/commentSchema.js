const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comments: {
    type: String,
  },
  replay: {
    type: String,
  },
  no_of_likes: {
    type: String,
  },
});
