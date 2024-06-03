import express from "express";
import {
  archiveClassroom,
  createClassroom,
  deleteClassroom,
  getClassroomById,
  getClassroomsByInstructorId,
  getClassroomsByUserId,
  getInvitationByToken,
  inviteStudents,
  joinClassroom,
  getDiscussionByClassroomId,
  getMyQuestionsByClassroomId
} from "../controllers/index.js";

import {
  authenticate,
  isInstructor,
  studentCheck,
} from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/invitation/:token", getInvitationByToken);
router.get("/join/:token", joinClassroom);
router.get("/:id", getClassroomById);

router.use(authenticate);

// router.use(studentCheck);
router.get("/student/:id", studentCheck, getClassroomsByUserId);
router.get("/discussion/:id", studentCheck, getDiscussionByClassroomId);
router.get("/discussion/my-questions/:id", studentCheck, getMyQuestionsByClassroomId);

router.use(isInstructor);
router.post("/", createClassroom);
router.get('/:id', getClassroomById)
router.delete("/delete/:id", deleteClassroom);
router.post("/invite", inviteStudents);
router.get("/instructor/:id", getClassroomsByInstructorId);



export default router;
