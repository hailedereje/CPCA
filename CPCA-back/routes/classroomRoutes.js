import express from "express";
import {
  archiveClassroom,
  createClassroom,
  deleteClassroom,
  enrollStudent,
  getClassroomsByInstructorId,
  getClassroomsByUserId,
  inviteStudents,
  joinClassroom,
} from "../controllers/index.js";

import {
  authenticate,
  isInstructor,
  studentCheck,
} from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.use(isInstructor);
router.post("/", createClassroom);
router.get("/:id", archiveClassroom);
router.delete("/delete/:id", deleteClassroom);
router.post("/invite", inviteStudents);
router.get("/instructor/:id", getClassroomsByInstructorId);

router.use(studentCheck);
router.get("/student/:id", getClassroomsByUserId);
router.post("/enroll", enrollStudent);
router.post("/join/:token", joinClassroom);

export default router;
