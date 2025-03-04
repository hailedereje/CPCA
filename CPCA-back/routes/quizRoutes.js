import express from "express";
import {
  completeQuiz,
  createQuiz,
  deleteQuizById,
  getAllQuizzes,
  getQuizById,
  updateQuizById,
} from "../controllers/index.js";

import {
  authenticate,
  isInstructor,
  studentCheck,
} from "../middlewares/authenticate.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { quizAnswerValidator, quizSchema } from "../validation/chapter/quizValidator.js";

const router = express.Router();

router.use(authenticate);

// router.use(isInstructor);
router.post("/new",validateRequest(quizSchema), createQuiz);
router.get("/all", getAllQuizzes);
router.post("/update/:id", updateQuizById);
router.get("/:id", getQuizById);
router.post("/delete/:id", deleteQuizById);
router.post("/complete/:quizId",validateRequest(quizAnswerValidator), completeQuiz);

router.use(studentCheck);
router.get("/:id", getQuizById);

export default router;
