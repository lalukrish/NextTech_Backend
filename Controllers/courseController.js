const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const Courses = require('../Schema/courseSchema');

const Course_Controller = {
    createCourse: async (req, res) => {
        try{
            const data = {
            course_name: req.body.course_name,
            title: req.body.title,
            rating: req.body.rating,
            comment: req.body.comment,
            }
        const newCourse =new Courses(data);
        try {
        const course_id = saved?._id;
        return res
            .status(200)
            .json({message:"Create Course Successfully"});
        
        } catch (error) {
            return res.status(400).json({message:"Failed to add Course"});
        }
        if (course_id) {
            res.status(409).json({ message: "This course is already exists" });
          }
        } catch (error) {
           
            return res.status(500).json({ message: "Server error,try again", error });
          }
    },

};
    