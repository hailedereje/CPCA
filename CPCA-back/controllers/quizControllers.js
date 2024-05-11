import { Quiz, User } from '../models';

// create quiz
export const createQuiz = async (req, res) => {
    try {
      const data = await Quiz.create(req.body);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
// add question to quiz
export const addQuestionToQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { question } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
          return res.status(404).json({ message: "Quiz not found" });
        }
        quiz.questions.push(...question);
        await quiz.save();
        return res.status(200).json(quiz);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
};

// update quiz
export const updateQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, { new: true });
        res.status(200).json(updatedQuiz);
    } catch (err) {
        res.status(400).json(err);
    }
};

// get a quiz by ID
export const getQuizById = async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId);
        res.status(200).json(quiz);
    } catch (err) {
        res.status(400).json(err);
    }
};

// delete a quiz
export const deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        await Quiz.findByIdAndDelete(quizId);
        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (err) {
        res.status(400).json(err);
    }
};

// user result
export const userResult = async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: {
            quizAttempted: {
              $each: [{ quizId: req.body.quizId, quizResult: req.body.quizResult }],
            },
          },
        },
        { new: true }
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  }