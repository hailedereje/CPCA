import express from "express";
import { createLesson, deleteLesson, updateLesson } from "../controllers/index.js";

const router = express.Router();

router.post("/:courseId/lessons", createLesson);
router.patch("/:courseId/lessons/:lessonId", updateLesson);
router.delete("/:courseId/lessons/:lessonId", deleteLesson);

export default router;
