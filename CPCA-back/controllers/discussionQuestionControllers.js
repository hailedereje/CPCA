import { DiscussionQuestion, Reply } from "../models/index.js";

// ask questions
export const askDiscussionQuestion = async (req, res) => {
    const { question, description, userId, tags } = req.body;
    try {
      const newDiscussionQuestion = await DiscussionQuestion.create({
        question,
        description,
        author: userId,
        tags,
        seen: [userId],
      });
      return res.status(201).json(newDiscussionQuestion);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

//   reply questions
export const answerDiscussionQuestion = async (req, res) => {
    const { answer, userId } = req.body;
  
    const { id: questionId } = req.params;
    try {
      const reply = await Reply.create({ reply: answer, author: userId });
      const findDiscussionQuestion = await DiscussionQuestion.findById(questionId);
      console.log("find", findDiscussionQuestion);
      const addReply = await findDiscussionQuestion.updateOne({
        $push: { replies: reply._id },
      });
      return res.status(201).json(reply);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

// get all questions
export const getAllDiscussionQuestions = async (req, res) => {
    try {
      const questions = await DiscussionQuestion.find({})
        .populate("replies")
        .populate({
          path: "replies",
          populate: {
            path: "author",
            model: "User",
          },
        })
        .populate("author")
        .sort({ createdAt: -1 });
      return res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: "Server Error in get all questions controller" });
    }
  }

// get my questions
export const getMyDiscussionQuestions = async (req, res) => {
    const { id: userId } = req.params;
    try {
      const replies = await DiscussionQuestion.find({ author: userId })
        .populate("replies")
        .populate({
          path: "replies",
          populate: {
            path: "author",
            model: "User",
          },
        })
        .populate("author")
        .sort({
          createdAt: -1,
        });
      return res.status(200).json(replies);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

// like questions
export const likeDiscussionQuestion = async (req, res) => {
    const { id: questionId } = req.params;
    const { userId } = req.body;
    try {
      const findDiscussionQuestion = await DiscussionQuestion.findById(questionId);
      if (findDiscussionQuestion.upvote.includes(userId)) {
        const reverse = await findDiscussionQuestion.updateOne({
          $pull: { upvote: userId },
        });
        return res.status(201).json({ message: "You have reversed upvoting" });
      }
  
      if (findDiscussionQuestion.downvote.includes(userId)) {
        const downvote = await findDiscussionQuestion.updateOne({
          $pull: { downvote: userId },
        });
        const upvote = await findDiscussionQuestion.updateOne({
          $push: { upvote: userId },
        });
        return res.status(200).json({ message: "Response updated successfully" });
      }
  
      const upvote = await findDiscussionQuestion.updateOne({
        $push: { upvote: userId },
      });
      return res.status(200).json(upvote);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

//  dislike questions
export const dislikeDiscussionQuestion = async (req, res) => {
    const { id: questionId } = req.params;
    const { userId } = req.body;
    try {
      const findDiscussionQuestion = await DiscussionQuestion.findById(questionId);
      if (findDiscussionQuestion.downvote.includes(userId)) {
        const reverse = await findDiscussionQuestion.updateOne({
          $pull: { downvote: userId },
        });
        return res.status(201).json({ message: "You have reversed downvoting" });
      }
  
      if (findDiscussionQuestion.upvote.includes(userId)) {
        const upvote = await findDiscussionQuestion.updateOne({
          $pull: { upvote: userId },
        });
        const downvote = await findDiscussionQuestion.updateOne({
          $push: { downvote: userId },
        });
        return res.status(200).json({ message: "Response updated successfully" });
      }
  
      const downvote = await findDiscussionQuestion.updateOne({
        $push: { downvote: userId },
      });
      return res.status(200).json(downvote);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

// find questions by topic
export const findDiscussionQuestionsByTopic = async (req, res) => {
    const { topic } = req.params;
    try {
      const questions = await DiscussionQuestion.find({
        tags: {
          $in: [topic],
        },
      })
        .populate("replies")
        .populate({
          path: "replies",
          populate: {
            path: "author",
            model: "DiscussionUser",
          },
        })
        .populate("author")
        .sort({ createdAt: -1 });
      return res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

// seen questions
export const seenDiscussionQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  const { userId } = req.body;
  try {
    const findDiscussionQuestion = await DiscussionQuestion.findById(questionId);
    const seen = await findDiscussionQuestion.updateOne({
      $push: { seen: userId },
    });
    return res.status(200).json(seen);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// seen reply
export const seenReply = async (req, res) => {
  const { id: replyId } = req.params;
  try {
    const reply = await Reply.findById(replyId);
    if(reply.seen === false){
      reply.seen = true;
      await reply.save();
    };
    return res.status(200).json({message: "Reply marked as seen"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error" });
  }
}

// send notification
export const receiveNotification= async (req, res) => {
  const { userId } = req.body;
  try {
    let unseen = {questions: [], replies: []};
    const AllDiscussionQuestions = await DiscussionQuestion.find({});
    AllDiscussionQuestions.forEach((question) => {
      if(!question.seen.includes(userId)){
        unseen.questions.push(question);
      }
    });

    const MyDiscussionQuestions = await DiscussionQuestion.find({ author: userId });
    MyDiscussionQuestions.forEach((question) => {
      question.replies.forEach((reply) => {
        if(!reply.seen){
          unseen.replies.push(reply);
        }
      });
    });
    return res.status(200).json(unseen);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}