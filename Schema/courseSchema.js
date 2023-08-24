const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
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
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Courses = mongoose.model("Courses", courseSchema);

module.exports = Courses;
