import express from "express";
import {
  getProgress,
  requestUnlockChapter,
  requestUnlockLesson,
  submitLessonProgress,
  submitPracticeProgress,
  submitQuizProgress,
} from "../controllers/index.js";

const router = express.Router();

router.post("/submit_lesson_progess", submitLessonProgress);
router.post("/submit_quiz_progess", submitQuizProgress);
router.post("/submit_practice_progess", submitPracticeProgress);
router.post("/request_unlock_chapter", requestUnlockChapter);
router.post("/request_unlock_lesson", requestUnlockLesson);
router.get("/:courseId/:studentId", getProgress);

export default router;
