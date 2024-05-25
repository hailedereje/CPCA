import { Chapter, Lesson, Progress } from "../models/index.js";

// Endpoint to submit lesson progress
export const submitLessonProgress =  async (req, res) => {
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
export const submitQuizProgress =  async (req, res) => {
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
export const submitPracticeProgress = async (req, res) => {
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

// requestUnlockChapter and requestUnlockLesson functions
const arePreviousItemsCompleted = async (studentId, courseId, currentId, type) => {
  if (type === 'chapter') {
    const chapters = await Chapter.find({ courseId }).sort({ _id: 1 });
    for (let chapter of chapters) {
      if (chapter._id.toString() === currentId) break;
      const progress = await Progress.findOne({ studentId, courseId, chapterId: chapter._id });
      if (!progress || !progress.completed) return false;
    }
  } else if (type === 'lesson') {
    const lessons = await Lesson.find({ chapterId: currentId }).sort({ _id: 1 });
    for (let lesson of lessons) {
      if (lesson._id.toString() === currentId) break;
      const progress = await Progress.findOne({ studentId, courseId, lessonId: lesson._id });
      if (!progress || !progress.completed) return false;
    }
  }
  return true;
};

export const requestUnlockChapter = async (req, res) => {
  const { studentId, courseId, chapterId } = req.body;

  try {
    const allPreviousCompleted = await arePreviousItemsCompleted(studentId, courseId, chapterId, 'chapter');
    if (allPreviousCompleted) {
      let progress = await Progress.findOne({ studentId, courseId, chapterId });
      if (!progress) {
        progress = new Progress({ studentId, courseId, chapterId, unlocked: true });
      } else {
        progress.unlocked = true;
      }
      await progress.save();
      res.json({ success: true, message: 'Chapter unlocked successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'All previous chapters must be completed before unlocking this chapter.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const requestUnlockLesson = async (req, res) => {
  const { studentId, courseId, chapterId, lessonId } = req.body;

  try {
    const allPreviousCompleted = await arePreviousItemsCompleted(studentId, courseId, lessonId, 'lesson');
    if (allPreviousCompleted) {
      let progress = await Progress.findOne({ studentId, courseId, chapterId, lessonId });
      if (!progress) {
        progress = new Progress({ studentId, courseId, chapterId, lessonId, unlocked: true });
      } else {
        progress.unlocked = true;
      }
      await progress.save();
      res.json({ success: true, message: 'Lesson unlocked successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'All previous lessons must be completed before unlocking this lesson.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

