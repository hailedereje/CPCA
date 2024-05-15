import { BadRequestError, NotFoundError } from "../errors/index.js";
import { Progress } from "../models/index.js";
import Course from "../models/course.js";
import courseSchema from "../validation/courseValidation.js";
import { createCourseSchema } from "../validation/createCourseValidator.js";
import { createCourseService } from "../services/courseService.js";

const createCourse = async (req, res) => {
  try {
    await createCourseSchema.validate(req.body)
      .then(async () => {
        await createCourseService(req.body)
          .then(course => res.status(201).send({ course }))
          .catch((err) => res.status(500).send({ message: "something went wrong", title: "internal server error", ...err }))
      })
      .catch(err => res.status(400).send({ message: err.message, title: err.path }))
  } catch (err) {
      console.error(...err)
      return res.status(500).send({ message: "something went wrong", title: "internal server error", ...err })
  }
}

const addPrerequistes = async (req,res) => {
  const { prerequisites, courseId } =  req.body
  console.log(req.body)
  return res.json("ok")
  
  // try {
  //   const course = await Course.findById(courseId)
  //   prerequisites.forEach(prereq => {
  //     course.prerequisites.push(prereq);
  //   });
  
  //   await course.save()
  //   return res.json(course)
  // }catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ error: 'Failed to add prerequisites to course' });
  // }
}

const getAllCourses = async (req, res) => {
  try{
     await Course.find().then(data => res.status(200).send(data));

  }catch(err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to load courses' });
  }
  
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

const enrollCourse = async () => { }
const approveEnrollment = async () => { }
export {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollCourse,
  approveEnrollment,
  updateCourse,
  deleteCourse,
  addPrerequistes
};
