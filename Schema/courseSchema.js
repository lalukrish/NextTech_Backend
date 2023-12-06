const mongoose = require("mongoose");

const technologyCourseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
  comment: {
    type: String,
  },
  total_no_user: {
    type: String,
  },
  user_registered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to a User model
  },
});

const Courses = mongoose.model("Courses", technologyCourseSchema);

module.exports = Courses;
