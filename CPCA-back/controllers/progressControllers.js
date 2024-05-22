import Progress from "../models/index.js";

// Endpoint to submit lesson progress
export const lessonProgress =  async (req, res) => {
  const { studentId, courseId, chapterId, lessonId } = req.body;

  try {
    let progress = await Progress.findOne({ studentId, courseId, chapterId, lessonId });
    if (!progress) {
      progress = new Progress({ studentId, courseId, chapterId, lessonId, completed: true });
    } else {
      progress.completed = true;
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint to submit quiz progress
export const quizProgress =  async (req, res) => {
  const { studentId, courseId, chapterId, quizId, score, totalScore, answers } = req.body;

  try {
    let progress = await Progress.findOne({ studentId, courseId, chapterId, quizId });
    if (!progress) {
      progress = new Progress({ studentId, courseId, chapterId, quizId, completed: true, score, totalScore, answers });
    } else {
      progress.completed = true;
      progress.score = score;
      progress.totalScore = totalScore;
      progress.answers = answers;
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint to submit practice question progress
export const practiceProgress = async (req, res) => {
  const { studentId, courseId, chapterId, practiceQuestionId, answers } = req.body;

  try {
    let progress = await Progress.findOne({ studentId, courseId, chapterId, practiceQuestionId });
    if (!progress) {
      progress = new Progress({ studentId, courseId, chapterId, practiceQuestionId, completed: true, answers });
    } else {
      progress.completed = true;
      progress.answers = answers;
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint to get student progress
export const getProgress =  async (req, res) => {
  const { courseId, studentId } = req.params;

  try {
    const progress = await Progress.find({ studentId, courseId });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
