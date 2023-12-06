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

        registered_courses: userId, // Reference to the User who registered the course
      });

      res
        .status(201)
        .json({ message: "Course registered successfully", course: newCourse });
    } catch (error) {
      console.log("error", error);
    }
  },

  getAllUsersForCourseReact: async (req, res) => {
    try {
      const title = "react"; // Specify the title value
      const usersForCourse = await Courses.find({ title })
        .populate("registered_courses", "username email") // Assuming User model has 'username' and 'email' fields
        .exec();
      const userCount = await Courses.countDocuments({ title });
      res.status(200).json({ usersForCourse, count: userCount });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = Course_Controller;
