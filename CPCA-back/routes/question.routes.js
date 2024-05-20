import express from "express";
import { authenticate, studentCheck } from "../middlewares/authenticate.js";
import {
  answerQuestion,
  askQuestion,
  dislikeQuestion,
  findQuestionsByTopic,
  getAllQuestions,
  getMyQuestions,
  likeQuestion,
  receiveNotification,
  seenQuestion,
  seenReply,
} from "../controllers/index.js";
  
const router = express.Router();

router.use(authenticate);
router.use(studentCheck)
router.post("/ask-question", askQuestion);
router.post("/answer/:id", answerQuestion);
router.post("/upvote/:id", likeQuestion);
router.post("/downvote/:id", dislikeQuestion);
router.post("/seen-question/:id", seenQuestion);
router.post("/seen-reply/:id", seenReply);
router.get("/questions", getAllQuestions);
router.get("/notification", receiveNotification);
router.get("/my-questions/:id", getMyQuestions);
router.get("/find/:topic", findQuestionsByTopic);

export default router;
