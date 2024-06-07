import express from "express";
import {
  calculateChapterProgress,
  calculateCourseProgress,
  completeLesson,
  getChaptersProgress,
  getLessonsProgress,
  requestUnlockChapter,
  requestUnlockLesson,
  submitPracticeProgress,
  submitQuizProgress,
  trackTime,
} from "../controllers/index.js";
import { authenticate, studentCheck } from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/:classroomId/:courseId", getChaptersProgress);
router.get("/:classroomId/:courseId/:chapterId", getLessonsProgress);
router.post("/chapter/:classroomId/:chapterId", calculateChapterProgress);
router.post("/course/:classroomId/:courseId", calculateCourseProgress);

router.use(studentCheck);
router.post("/submit_lesson_progess", completeLesson);
router.post("/track_time", trackTime);
router.post("/submit_quiz_progess", submitQuizProgress);
router.post("/submit_practice_progess", submitPracticeProgress);
router.post("/request_unlock_chapter", requestUnlockChapter);
router.post("/request_unlock_lesson", requestUnlockLesson);

export default router;
