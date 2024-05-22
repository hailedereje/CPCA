import QuizQuestion from "../models/quizQuestion.js";
import Quiz from "../models/quiz.js";

// Create a new quiz question
const createQuizQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, quizId } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const newQuizQuestion = new QuizQuestion({
      question,
      options,
      correctAnswer,
      quizId,
    });
    await newQuizQuestion.save();
    res.status(201).json(newQuizQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all quiz questions
const getAllQuizQuestions = async (req, res) => {
  try {
    const quizQuestions = await QuizQuestion.find();
    res.json(quizQuestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single quiz question by ID
const getQuizQuestionById = async (req, res) => {
  try {
    const quizQuestion = await QuizQuestion.findById(req.params.id);
    if (!quizQuestion) {
      return res.status(404).json({ message: "Quiz question not found" });
    }
    res.json(quizQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a quiz question by ID
const updateQuizQuestionById = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const quizQuestion = await QuizQuestion.findById(req.params.id);
    if (!quizQuestion) {
      return res.status(404).json({ message: "Quiz question not found" });
    }
    quizQuestion.question = question;
    quizQuestion.options = options;
    quizQuestion.correctAnswer = correctAnswer;
    await quizQuestion.save();
    res.json(quizQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a quiz question by ID
const deleteQuizQuestionById = async (req, res) => {
  try {
    const quizQuestion = await QuizQuestion.findByIdAndDelete(req.params.id);
    if (!quizQuestion) {
      return res.status(404).json({ message: "Quiz question not found" });
    }
    res.json({ message: "Quiz question deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createQuizQuestion,
  getAllQuizQuestions,
  getQuizQuestionById,
  updateQuizQuestionById,
  deleteQuizQuestionById,
};
