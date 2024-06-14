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
  requestUnlockLab,
  requestUnlockQuiz,
  getLabsProgress,
  getQuizzesProgress,
  completeLab,
  getQuizStatistics,
} from "../controllers/progressControllers.js";
import { authenticate, studentCheck, isInstructor } from "../middlewares/authenticate.js";
import { getChaptersProgress } from "../controllers/progressControllers.js";

const router = express.Router();

router.use(authenticate);

// Instructor routes
router.get("/:classroomId/student/:studentId", getStudentProgress);
// Student routes
router.get("/chapters/:classroomId/:courseId", studentCheck, getChaptersProgress);
router.get("/lessons/:classroomId/:courseId/:chapterId", studentCheck, getLessonsProgress);
router.get("/labs/:classroomId/:courseId", studentCheck, getLabsProgress);
router.get("/quizzes/:classroomId/:courseId", studentCheck, getQuizzesProgress);
router.post("/chapter/:classroomId/:chapterId", studentCheck, calculateChapterProgress);
router.post("/course/:classroomId/:courseId", studentCheck, calculateCourseProgress);

router.post("/submit_lesson_progress", studentCheck, completeLesson);
router.post("/submit_lab_progress", studentCheck, completeLab);
router.post("/track_time", studentCheck, trackTime);
router.post("/submit_quiz_progress", studentCheck, submitQuizProgress);
router.post("/submit_practice_progress", studentCheck, submitPracticeProgress);
router.post("/request_unlock_chapter", studentCheck, requestUnlockChapter);
router.post("/request_unlock_lesson", studentCheck, requestUnlockLesson);
router.post("/request_unlock_quiz", studentCheck, requestUnlockQuiz);
router.post("/request_unlock_lab", studentCheck, requestUnlockLab);

router.get("/quiz-stats", getQuizStatistics);
export default router;
