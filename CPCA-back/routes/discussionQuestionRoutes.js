import express from "express";
import { authenticate, studentCheck } from "../middlewares/authenticate.js";
import { answerDiscussionQuestion, askDiscussionQuestion, dislikeDiscussionQuestion, findDiscussionQuestionsByTopic, getAllDiscussionQuestions, getMyDiscussionQuestions, likeDiscussionQuestion, receiveNotification, seenDiscussionQuestion, seenReply } from "../controllers/index.js";
  
const router = express.Router();

router.use(authenticate);
router.post("/ask-question", askDiscussionQuestion);
router.post("/answer/:id", answerDiscussionQuestion);
router.post("/upvote/:id", likeDiscussionQuestion);
router.post("/downvote/:id", dislikeDiscussionQuestion
);
router.post("/seen-question/:id", seenDiscussionQuestion);
router.post("/seen-reply/:id", seenReply);
router.get("/questions", getAllDiscussionQuestions);
router.get("/notification", receiveNotification);
router.get("/my-questions/:id", getMyDiscussionQuestions);
router.get("/find/:topic", findDiscussionQuestionsByTopic);

export default router;
