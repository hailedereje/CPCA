import { Chapter, Classroom, Lesson, PracticeQuestion, Progress, Quiz } from "../models/index.js";

// Endpoint to submit lesson complete
export const completeLesson =  async (req, res) => {
  const { classroomId, courseId, chapterId, lessonId } = req.body;

  try {
    let progress = await Progress.findOne({ classroomId, studentId: req.user._id, courseId, chapterId, lessonId });
    progress.completed = true;
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint for time tracking
export const trackTime = async (req, res) => {
  const { courseId, chapterId, lessonId, sessionTime, lastAccessed } = req.body;
  const userId = req.user._id;

  try {
      let progress = await Progress.findOne({ courseId, chapterId, lessonId, userId });
      if (progress) {
          progress.timeSpent += sessionTime;
          progress.lastAccessed = lastAccessed;
      } else {
          progress = new Progress({ courseId, chapterId, lessonId, userId, timeSpent: sessionTime, lastAccessed, completed: false });
      }
      await progress.save();
      res.status(200).send('Time tracked successfully');
  } catch (error) {
      res.status(500).send('Server error');
  }
}

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

// requestUnlockChapter and requestUnlockLesson functions
const arePreviousItemsCompleted = async (classroomId, courseId, currentId, studentId, type) => {
  if (type === 'chapter') {
    const chapters = await Chapter.find({ courseId }).sort({ _id: 1 });
    for (let chapter of chapters) {
      if (chapter._id.toString() === currentId) break;
      const progress = await Progress.findOne({ classroomId, studentId, courseId, chapterId: chapter._id });
      if (!progress || !progress.completed) return false;
    }
  } else if (type === 'lesson') {
    const lessons = await Lesson.find({ chapterId: currentId }).sort({ _id: 1 });
    for (let lesson of lessons) {
      if (lesson._id.toString() === currentId) break;
      const progress = await Progress.findOne({ classroomId, studentId: req.user._id, courseId, lessonId: lesson._id });
      if (!progress || !progress.completed) return false;
    }
  }
  return true;
};

export const requestUnlockChapter = async (req, res) => {
  const { classroomId, courseId, chapterId } = req.body;
  const studentId = req.user._id;
  const currentId = chapterId;

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom.students.includes(studentId)) {
      return res.status(403).json({ success: false, message: 'You are not enrolled in this classroom.' });
    }
    const allPreviousCompleted = await arePreviousItemsCompleted(classroomId, courseId, currentId, studentId, 'chapter');
    console.log('allPreviousCompleted', allPreviousCompleted)
    if (allPreviousCompleted) {
      let progress = await Progress.findOne({ classroomId, studentId, courseId, chapterId });
      if (!progress) {
        progress = new Progress({ classroomId, studentId, courseId, chapterId, unlocked: true });
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
  const { classroomId, courseId, chapterId, lessonId } = req.body;
  const studentId = req.user._id;
  const currentId = lessonId;

  try {
    const allPreviousCompleted = await arePreviousItemsCompleted(classroomId, courseId, currentId, studentId, 'lesson');
    if (allPreviousCompleted) {
      let progress = await Progress.findOne({ classroomId, studentId, courseId, chapterId, lessonId });
      if (!progress) {
        progress = new Progress({ classroomId, studentId, courseId, chapterId, lessonId, unlocked: true });
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

// Endpoint to get chapter progress
export const getChaptersProgress =  async (req, res) => {
  const { classroomId, courseId } = req.params;
  const studentId = req.user._id

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom.students.includes(studentId)) {
      return res.status(403).json({ success: false, message: 'You are not enrolled in this classroom.' });
    }
    let progress = []
    const chapters = await Chapter.find({ courseId: courseId });
    for (let chapter of chapters) {
      let chapterProgress = await Progress.findOne({ classroomId, studentId, courseId, chapterId: chapter._id });
      if (!chapterProgress) {
        chapterProgress = new Progress({ classroomId, studentId, courseId, chapterId: chapter._id });
        await chapterProgress.save();
      }
      progress.push(chapterProgress);
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint to get lesson progress
export const getLessonsProgress =  async (req, res) => {
  const { classroomId, courseId, chapterId } = req.params;
  const studentId = req.user._id
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom.students.includes(studentId)) {
      return res.status(403).json({ success: false, message: 'You are not enrolled in this classroom.' });
    }
    let progress = []
    const lessons = await Lesson.find({ chapterId: chapterId });
    for (let lesson of lessons) {
      let lessonProgress = await Progress.findOne({ classroomId, studentId, courseId, chapterId, lessonId: lesson._id });
      if (!lessonProgress) {
        lessonProgress = new Progress({ classroomId, studentId, courseId, chapterId, lessonId: lesson._id });
        await lessonProgress.save();
      }
      progress.push(lessonProgress);
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Calculate the progress for a course
export const calculateCourseProgress = async (req, res) => {
  const { classroomId, courseId } = req.params;
  const studentId = req.user._id
  console.log("calculate course progress")
    
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom.students.includes(studentId)) {
      return res.status(403).json({ success: false, message: 'You are not enrolled in this classroom.' });
    }

    const chapters = await Chapter.find({ courseId: courseId });
    let totalChapters = chapters.length;
    let completedChapters = 0;

    for (let chapter of chapters) {
      const progress = await Progress.findOne({
        classroomId: classroomId,
        studentId: studentId,
        chapterId: chapter._id
      });

      if (progress && progress.completed) {
        completedChapters++;
      }
    }

    const courseProgress = (completedChapters / totalChapters) * 100;
    res.status(200).json({ progress: courseProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating course progress', error });
  }
};

// Calculate the progress for a chapter
export const calculateChapterProgress = async (req, res) => {
  console.log("calculate chapter progress")
  const { classroomId, chapterId } = req.params;
  const studentId = req.user._id
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom.students.includes(studentId)) {
      return res.status(403).json({ success: false, message: 'You are not enrolled in this classroom.' });
    }

    const progress = await Progress.findOne({classroomId, studentId, chapterId});
    const lessons = await Lesson.find({ chapterId: chapterId });
    const quizzes = await Quiz.find({ chapterId: chapterId });
    const practiceQuestions = await PracticeQuestion.find({ chapterId: chapterId });

    const totalItems = lessons.length + quizzes.length + practiceQuestions.length;
    let completedItems = 0;

    for (let lesson of lessons) {
      const progress = await Progress.findOne({
        classroomId: classroomId,
        studentId: studentId,
        chapterId: chapterId,
        lessonId: lesson._id
      });

      if (progress && progress.completed) {
        completedItems++;
      }
    }

    for (let quiz of quizzes) {
      const progress = await Progress.findOne({
        classroomId: classroomId,
        chapterId: chapterId,
        studentId: studentId,
        quizId: quiz._id
      });

      if (progress && progress.completed) {
        completedItems++;
      }
    }

    for (let practiceQuestion of practiceQuestions) {
      const progress = await Progress.findOne({
        classroomId: classroomId,
        chapterId: chapterId,
        studentId: studentId,
        practiceQuestionId: practiceQuestion._id
      });

      if (progress && progress.completed) {
        completedItems++;
      }
    }

    const chapterProgress = (completedItems / totalItems) * 100;
    if (chapterProgress == 100) {
      progress.completed = true;
      progress.save();
    }

    res.status(200).json({ progress: chapterProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating chapter progress', error });
  }
};

