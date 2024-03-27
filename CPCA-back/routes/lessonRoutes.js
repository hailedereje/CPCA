import express from "express";
import { createLesson, deleteLesson, updateLesson } from "../controllers/index.js";
import multer from "multer";


// const upload = multer({
//     storage: {
//         ''
//     }
// })
const router = express.Router();

router.post("/:courseId/lessons", createLesson);
router.patch("/:courseId/lessons/:lessonId", updateLesson);
router.delete("/:courseId/lessons/:lessonId", deleteLesson);

export default router;
