import { BadRequestError, NotFoundError } from "../errors/index.js";
import { Progress } from "../models/index.js";
import Course from "../models/course.js";
import courseSchema from "../validation/courseValidation.js";
import { createCourseService } from "../services/course/createCourseService.js";


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

export const getCourseListFilter = async (req,res) => {
  try{
    const courseFilter = await Course.aggregate([
      {
        $project: {
          id: "$_id",
          title: 1,
          _id: 0
        }
      }
    ]) ?? []
    return res.status(200).json(courseFilter);
  }catch(err) {
    return res.status(500).send("internal server error")
  }
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
  // createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  addPrerequistes
};
