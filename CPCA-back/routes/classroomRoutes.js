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
  getMyQuestionsByClassroomId,
  getAllInvitations,
  updateInvitationAccepted,
  deleteInvitation,
  topTenClassRooms
} from "../controllers/index.js";

import {
  authenticate,
  isInstructor,
  studentCheck,
} from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/invitation/:token", getInvitationByToken);
router.put("/invitation/accept", updateInvitationAccepted);
router.get("/join/:token", joinClassroom);
router.get("/:id", getClassroomById);

router.use(authenticate);

// router.use(studentCheck);

router.get("/student/:id", getClassroomsByUserId);
router.get("/discussion/:id", getDiscussionByClassroomId);
router.get("/discussion/my-questions/:id", getMyQuestionsByClassroomId);

router.get("/top-classrooms/find",topTenClassRooms)

router.use(isInstructor);
router.post("/", createClassroom);

router.get('/:id', getClassroomById)
router.delete("/delete/:id", deleteClassroom);
router.post("/invite", inviteStudents);
router.get("/invitations/:id", getAllInvitations);
router.delete("/invitation/:id", deleteInvitation);
router.get("/instructor/:id", getClassroomsByInstructorId);



export default router;
