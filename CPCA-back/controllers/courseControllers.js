import { BadRequestError, NotFoundError } from "../errors/index.js";
import { Progress } from "../models/index.js";
import Course from "../models/course.js";
import { CreateCourseValidator } from "../validation/createCourseValidation.js";
import * as CourseService from "../services/courseService.js"

const createCourse = async (req, res) => {
  // const { title, description, objectives, templateImg } = req.body;
  await CreateCourseValidator.validate(req.body).then( async() => {

  })

  const newCourse = await Course.create({
    title,
    description,
    objectives,
    templateImg, // Assuming the template image is provided
    instructor: req.user._id, // Assuming the instructor is the logged-in user
  });
  if (newCourse) {
    return res.status(201).json(newCourse);
  }
  throw new BadRequestError("Invalid course data");
};

const getAllCourses = async (req, res) => {
  // const {page, name,level,tag } = req.query;
  console.log(req.query)
   getAllCourses().then(courses => {
    return res.status(200).send({courses})
  }).catch(err =>  {
    res.status(500).send({message: "something went wrong",title:"internal server error"})
    console.log(err)
  })
}

const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).populate("instructor");
  if (!course) {
    // throw new NotFoundError("Course not found");
    console.log("course not found")
  }
  return res.json(course);
};

const enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) {
    throw new NotFoundError("Course Not found");
  }
  const progress = new Progress({
    user: req.user._id, // Assuming the user is the logged-in user
    course: courseId,
    currentLesson: null, // Initially, no lesson is set as current
    completedLessons: [], // Initially, no lessons are completed
    currentPosition: 0, // Initial position
    lastAccessedAt: new Date(), // Record the time of enrollment
  });

  if (progress) {
    await progress.save();
    return res.status(201).json(progress);
  }

  throw new BadRequestError("Enrollment failed");
};

const approveEnrollment = async (req, res) => {
  res.send("approve enrollement");
};

const updateCourse = async (req, res) => {
  res.send("update course");
};

const deleteCourse = async (req, res) => {
  res.send("delete course");
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
