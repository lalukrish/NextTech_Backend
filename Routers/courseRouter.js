const express = require("express");
const Course_Controller = require("../Controllers/courseController");

const router = express.Router();

// router.post("/techcourse-register", Course_Controller.registerCourse);

router.post("/register-course-tech", Course_Controller.registerCourse);

router.get(
  "/get-all-registered-course/:userId",
  Course_Controller.getAllCoursesForUser
);

module.exports = router;
