import Quiz from "../models/quiz.js";
import QuizQuestion from "../models/quizQuestion.js";

// Create a new quiz question
const createQuizQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, quizId } = req.body;
    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    const quizQuestion = new QuizQuestion({
      question,
      options,
      quizId,
    });
    
    quiz.questions.push(quizQuestion._id)
    await  quiz.save()
    await quizQuestion.save();
    res.status(201).json({ message: 'Quiz question created successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all quiz questions
const getAllQuizQuestions = async (req, res) => {
  console.log(req.query);
  const { page = 1, search = '' } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = {
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { question: { $regex: search, $options: 'i' } }
    ],
  };

  try {
    const questions = await QuizQuestion.find(query).skip(skip).limit(limit)
    const totalQuestions = await QuizQuestion.countDocuments(query);
    const totalPages = Math.ceil(totalQuestions / limit);

    res.json({ questions, totalPages });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching questions' });
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
    const { question, options,questionId } = req.body;
    const quizQuestion = await QuizQuestion.findById(questionId);
    
    if (!quizQuestion) {
      return res.status(404).json({ message: "Quiz question not found" });
    }
    
    quizQuestion.question = question;
    quizQuestion.options = options;
    
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
