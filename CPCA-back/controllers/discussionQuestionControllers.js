import { Classroom, Discussion, DiscussionQuestion, Notification, Reply } from "../models/index.js";

// ask questions
export const askDiscussionQuestion = async (req, res) => {
    const { title, description, tags, classroomId } = req.body;
    try {
      const newDiscussionQuestion = await DiscussionQuestion.create({
        title,
        description,
        author: req.user._id,
        tags,
        seen: [req.user._id],
      });
      const classroom = await Classroom.findById(classroomId);
      console.log(classroom);
      const discussion = await Discussion.findOne({classroomId: classroomId});
      if(!discussion){
        await Discussion.create({classroomId: classroomId, discussion: [newDiscussionQuestion._id]});
      } else {
      await discussion.updateOne({
        $push: { discussion: newDiscussionQuestion._id },
      })};
      classroom.students.forEach(async (student) => {
        if (student.toString() !== req.user._id.toString()) {
          console.log(student._id.toString(), req.user._id.toString());
          const notification = new Notification({
            message: `New question in your classroom: ${title}`,
            user: student,
            read: false
          });
          await notification.save();
          req.io.to(student.toString()).emit('new_notification', notification);
        }
      })
      return res.status(201).json(newDiscussionQuestion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error from ask" });
    }
  }

//   reply questions
export const answerDiscussionQuestion = async (req, res) => {
    const { answer } = req.body;
  
    const { id: questionId } = req.params;
    try {
      const reply = await Reply.create({ reply: answer, author: req.user._id });
      const findDiscussionQuestion = await DiscussionQuestion.findById(questionId);
      await findDiscussionQuestion.updateOne({
        $push: { replies: reply._id },
      });
      const notification = new Notification({
        message: `Someone replied to your question: ${findDiscussionQuestion.title}`,
        user: findDiscussionQuestion.author
      });
      await notification.save();
      req.io.to(findDiscussionQuestion.author.toString()).emit('new_notification', notification);
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