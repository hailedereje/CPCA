import express from "express";
import { authenticate, isAdmin, isInstructor, studentCheck } from "../middlewares/authenticate.js";

import {
  addPrerequistes,
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/index.js";

const router = express.Router();

router.use(authenticate);
// For students
router.get("/", getAllCourses);
// router.get("/:courseId", getCourseById);
// router.post("/:courseId/enroll",studentCheck,enrollCourse);

// For instructors
router.use(isAdmin);
router.get("/all",getAllCourses)
router.post("/new", createCourse);
router.post("/add-prerequisites",addPrerequistes)
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);


// For admins
// router.patch("/:id/approve-enrollment", approveEnrollment);

export default router;
