import { Chapter, Course, Quiz,QuizQuestion } from '../models/index.js';


export const createQuiz = async (req, res) => {
  try {
    const { courseId, chapterId, title, instruction, duration } = req.body;
    const quiz = new Quiz({
      courseId,
      chapterId,
      title,
      instruction,
      duration,
    });

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    chapter.quiz = quiz._id;
    await quiz.save();
    await chapter.save();

    return res.status(201).json({ message: 'Quiz created successfully', quiz });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get quizzes' });
  }
};


export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id).populate({
      path: 'questions',
      model: 'QuizQuestion',
      select: 'question options',
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    // if(quiz.isOpend === true){
    //   await quiz.save();
    //   return res.status(200).json(quiz);
    // }
    // return res.status(400).send({ error: 'you can not take quiz more than once' });
    return res.status(200).json(quiz);
  } catch (error) {
    console.log(error)
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

export const completeQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questions,userId } = req.body;
 
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const score = calculateScore(quiz, questions);
    res.status(200).json({ score });

  } catch (error) {
    res.status(500).json({ error: 'Failed to take quiz' });
  }
}

const calculateScore = (quiz, answeredQuestions) => {
  let score = 0;

  answeredQuestions.forEach(answeredQuestion => {
    const question = quiz.questions.find(q => q.id === answeredQuestion.questionId);
    if (question) {
      const selectedOption = question.options.find(option => option.id === answeredQuestion.answerId);
      if (selectedOption && selectedOption.isCorrect) {
        score++; 
      }
    }
  });

  return score;
};
