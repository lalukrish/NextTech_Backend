const Users = require("../Schema/userSchema");
const Courses = require("../Schema/courseSchema");

const Course_Controller = {
  registerCourse: async (req, res) => {
    try {
      const { course_name, title, userId } = req.body;
      const user = Courses.findOne({ _id: userId });
      if (!user) {
        return res.status(200).json({ message: "No user found" });
      }
      const newCourse = await Courses.create({
        course_name,
        title,

        user_registered: userId, // Reference to the User who registered the course
      });

      res
        .status(201)
        .json({ message: "Course registered successfully", course: newCourse });
    } catch (error) {
      console.log("error", error);
    }
  },

  getAllCoursesForUser: async (req, res) => {
    try {
      const { userId } = req.params; // Assuming userId is passed as a URL parameter
      const userCourses = await Courses.find({ user_registered: userId });
      const reactCourseCount = await Courses.countDocuments({
        user_registered: userId,
        course_name: "react",
      });
      const htmlCourseCount = await Courses.countDocuments({
        user_registered: userId,
        course_name: "html",
      });
      const nodejsCourseCount = await Courses.countDocuments({
        user_registered: userId,
        course_name: "nodejs",
      });
      const cssCourseCount = await Courses.countDocuments({
        user_registered: userId,
        course_name: "css",
      });
      res.status(200).json({
        userCourses,
        counts: {
          react: reactCourseCount,
          html: htmlCourseCount,
          nodejs: nodejsCourseCount,
          css: cssCourseCount,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = Course_Controller;
