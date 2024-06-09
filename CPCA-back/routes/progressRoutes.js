import express from "express";
import {
  calculateChapterProgress,
  calculateCourseProgress,
  completeLesson,
  getLessonsProgress,
  requestUnlockChapter,
  requestUnlockLesson,
  submitPracticeProgress,
  submitQuizProgress,
  trackTime,
  getStudentProgress,
} from "../controllers/progressControllers.js";
import { authenticate, studentCheck, isInstructor } from "../middlewares/authenticate.js";
import { getChaptersProgress } from "../controllers/progressControllers.js";

const router = express.Router();

router.use(authenticate);

// Instructor routes
router.get("/:classroomId/student/:studentId", isInstructor, getStudentProgress);
// Student routes
router.get("/:classroomId/:courseId", studentCheck, getChaptersProgress);
router.get("/:classroomId/:courseId/:chapterId", studentCheck, getLessonsProgress);
router.post("/chapter/:classroomId/:chapterId", studentCheck, calculateChapterProgress);
router.post("/course/:classroomId/:courseId", studentCheck, calculateCourseProgress);

router.post("/submit_lesson_progess", studentCheck, completeLesson);
router.post("/track_time", studentCheck, trackTime);
router.post("/submit_quiz_progess", studentCheck, submitQuizProgress);
router.post("/submit_practice_progess", studentCheck, submitPracticeProgress);
router.post("/request_unlock_chapter", studentCheck, requestUnlockChapter);
router.post("/request_unlock_lesson", studentCheck, requestUnlockLesson);


export default router;
