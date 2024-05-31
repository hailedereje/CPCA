import express from "express";
import {
  archiveClassroom,
  createClassroom,
  deleteClassroom,
  getClassroomsByInstructorId,
  getClassroomsByUserId,
  getInvitationByToken,
  inviteStudents,
  joinClassroom,
} from "../controllers/index.js";

import {
  authenticate,
  isInstructor,
  studentCheck,
} from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/invitation/:token", getInvitationByToken);
router.get("/join/:token", joinClassroom);

router.use(authenticate);

router.use(isInstructor);
router.post("/", createClassroom);
router.get("/:id", archiveClassroom);
router.post("/delete/:id", deleteClassroom);
router.post("/invite", inviteStudents);
router.get("/instructor/:id", getClassroomsByInstructorId);

router.use(studentCheck);
router.get("/student/:id", getClassroomsByUserId);

export default router;
