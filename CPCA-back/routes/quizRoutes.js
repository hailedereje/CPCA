import express from 'express';
import { createQuiz, deleteQuiz, getAllQuizes, getQuizById, updateQuiz } from '../controllers/quizControllers.js';
// Repeat for each controller file

import { authenticate, isInstructor, studentCheck } from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.use(isInstructor);
router.post("/new", createQuiz);
router.get("/all", getAllQuizes);
router.post("/update/:id", updateQuiz);
router.get("/:id", getQuizById);
router.post("/delete/:id", deleteQuiz);

router.use(studentCheck);
router.get("/:id", getQuizById);

export default router;