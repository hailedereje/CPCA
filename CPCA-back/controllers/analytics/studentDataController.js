import Progress from "../../models/progress.js";
import Quiz from "../../models/quiz.js";

export const getStudentPerformance = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    const progress = await Progress.find();

    const data = quizzes.map(quiz => ({
      name: quiz.title,
      score: progress.filter(p => p.quizId.equals(quiz._id)).reduce((acc, curr) => acc + curr.score, 0) / progress.filter(p => p.quizId.equals(quiz._id)).length || 0
    }));

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
