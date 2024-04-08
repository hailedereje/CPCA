import express from "express";
import { authenticate, isInstructor, studentCheck } from "../middlewares/authenticate.js";

import {
  approveEnrollment,
  createCourse,
  deleteCourse,
  enrollCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controllers/index.js";

const router = express.Router();

// router.use(authenticate);
// For students
router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);
router.post("/:courseId/enroll",studentCheck,enrollCourse);

// For instructors
router.use(isInstructor);
router.post("/new", createCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);


// For admins
router.patch("/:id/approve-enrollment", approveEnrollment);

export default router;
