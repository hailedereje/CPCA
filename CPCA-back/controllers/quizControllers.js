import { Quiz, Chapter, Course } from '../models/index.js';

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, instruction, duration, courseId, chapterId } = req.body;
    if (!title || !courseId || !chapterId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const quiz = new Quiz({ title, instruction, duration, courseId, chapterId });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};
// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get quizzes' });
  }
};

// Get a quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get quiz' });
  }
};

// Update a quiz by ID
export const updateQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, instruction, duration, courseId, chapterId } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, instruction, duration, courseId, chapterId },
      { new: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

// Delete a quiz by ID
export const deleteQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};