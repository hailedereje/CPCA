import express from 'express';
import { addQuestionToQuiz, createQuiz, deleteQuiz, getQuizById, updateQuiz, userResult } from '../controllers/quizControllers.js';
// Repeat for each controller file

import { authenticate, isInstructor, studentCheck } from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);
router.use(isInstructor);

router.post("/new", createQuiz);
router.post("/add_new_question/:id", addQuestionToQuiz);
router.post("/update/:id", updateQuiz);
router.get("/:id", getQuizById);
router.post("/delete/:id", deleteQuiz);

router.use(studentCheck);
router.get("/:id", getQuizById);
router.post("/result/:id", userResult);

export default router;
