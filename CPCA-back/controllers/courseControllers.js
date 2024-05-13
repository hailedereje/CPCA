import { BadRequestError, NotFoundError } from "../errors/index.js";
import { Progress } from "../models/index.js";
import Course from "../models/course.js";
import courseSchema from "../validation/courseValidation.js";

const createCourse = async (req, res) => {
  const courseData = {
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript",
    author: "John Doe",
    level: "Beginner",
    duration: "6 weeks",
    templateImg: "https://example.com/template.jpg",
    instructor: "betsegawlemma@gmail.com",
  };

  const { error } = courseSchema.validate(courseData);
  if (error) {
    return res.status(400).send(error.details[0].message);
    console.log(error);
    // throw new BadRequestError(error);
  }

  const course = new Course(courseData);
  await course.save();
  console.log("Course saved:", course);
};

const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  if (courses) {
    return res.send(courses);
  }
  throw new NotFoundError("Courses not found");
};

const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return NotFoundError("Course not found");
  res.send(course);
};

const updateCourse = async (req, res) => {
  const { error } = courseSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!course) return NotFoundError("Course not found");
  res.send(course);
};

const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  if (!course) return res.status(404).send("Course not found");
  res.send(course);
};

export {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollCourse,
  approveEnrollment,
  updateCourse,
  deleteCourse,
};
