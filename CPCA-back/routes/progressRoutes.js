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
  getChaptersProgress,
  getStudentChaptersProgress , 
  getStudentLessonsProgress, 
  getStudnetLabsProgress, 
  getStudentQuizzesProgress,
  calculateStudentCourseProgress,
  calculateStudentChapterProgress
} from "../controllers/progressControllers.js";
import { authenticate, studentCheck, isInstructor } from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);

// Instructor routes
router.get("/:classroomId/student/:studentId", isInstructor, getStudentProgress);

// Add new instructor routes to track individual student progress
router.get("/:classroomId/student/:studentId/chapters", isInstructor, getStudentChaptersProgress);
router.get("/:classroomId/student/:studentId/lessons/:chapterId", isInstructor, getStudentLessonsProgress);
router.get("/:classroomId/student/:studentId/labs", isInstructor, getStudnetLabsProgress);
router.get("/:classroomId/student/:studentId/quizzes", isInstructor, getStudentQuizzesProgress);
router.post("/:classroomId/student/:studentId/course/:courseId", isInstructor, calculateStudentCourseProgress);
router.post("/:classroomId/student/:studentId/chapter/:chapterId", isInstructor, calculateStudentChapterProgress);

// Student routes
router.get("/chapters/:classroomId/:courseId", studentCheck, getChaptersProgress);
router.get("/lessons/:classroomId/:courseId/:chapterId", getLessonsProgress);
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

export default router;
  