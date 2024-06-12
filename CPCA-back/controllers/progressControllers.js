import { Chapter, Classroom, Lab, Lesson, PracticeQuestion, Progress, Quiz } from "../models/index.js";

// Helper function to get progress
const getProgress = async (classroomId, studentId, courseId, chapterId) => {
  const chapters = await Chapter.find({ courseId });
  const lessons = await Lesson.find({ chapterId });
  const quizzes = await Quiz.find({ chapterId });
  const practiceQuestions = await PracticeQuestion.find({ chapterId });

  const totalItems = lessons.length + quizzes.length + practiceQuestions.length;
  let completedItems = 0;

  for (let lesson of lessons) {
    const progress = await Progress.findOne({
      classroomId,
      studentId,
      chapterId,
      lessonId: lesson._id
    });

    if (progress && progress.completed) {
      completedItems++;
    }
  }

  for (let quiz of quizzes) {
    const progress = await Progress.findOne({
      classroomId,
      chapterId,
      studentId,
      quizId: quiz._id
    });

    if (progress && progress.completed) {
      completedItems++;
    }
  }

  for (let practiceQuestion of practiceQuestions) {
    const progress = await Progress.findOne({
      classroomId,
      chapterId,
      studentId,
      practiceQuestionId: practiceQuestion._id
    });

    if (progress && progress.completed) {
      completedItems++;
    }
  }

  const chapterProgress = (completedItems / totalItems) * 100;
  return chapterProgress;
};

// Endpoint to submit lesson complete
export const completeLesson = async (req, res) => {
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


export const submitQuizProgress =  async (req, res) => {
    const {studentId,quizId,questions} = req.body;
    const classroomId = "665a14e2e5dda17a7dcd55df"
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    const { courseId, chapterId } = quiz;
    const score = calculateScore(quiz, questions);
    const totalScore = quiz.questions.length;

    let progress = await Progress.findOne({ studentId, courseId, chapterId, quizId });
    if (!progress) {
      progress = new Progress({classroomId, studentId, courseId, chapterId, quizId, completed: true, score, totalScore });
    } else {
      progress.completed = true;
      progress.score = score;
      progress.totalScore = totalScore;
    }

    await progress.save();
    res.json({score:progress.score, totalScore:progress.totalScore});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
  else if (type === 'lab'){
    const labs = await Lab.find({ courseId: currentId }).sort({ _id: 1 });
    for (let lab of labs) {
      if (lab._id.toString() === currentId) break;
      const progress = await Progress.findOne({ classroomId, studentId: req.user._id, courseId, labId: lab._id });
      if (!progress || !progress.completed) return false;
    }
  }
  return true;
};

export const requestUnlockQuiz = async (req, res) => {
  const { classroomId, courseId, chapterId, quizId } = req.body;
  const studentId = req.user._id;

  try {
    const lessons = await Lesson.find({ chapterId }).sort({ _id: 1 });
    const allLessonsCompleted = lessons.every(lesson => {
      return Progress.findOne({ classroomId, studentId, courseId, chapterId, lessonId: lesson._id, completed: true });
    });

    if (allLessonsCompleted) {
      let progress = await Progress.findOne({ classroomId, studentId, courseId, chapterId, quizId });
      if (!progress) {
        progress = new Progress({ classroomId, studentId, courseId, chapterId, quizId, unlocked: true });
      }
      else if (progress.unlocked) {
        return res.status(400).json({ success: false, message: 'Quiz is already unlocked.' });
      }
      else {
        progress.unlocked = true;
      }
      await progress.save();
      res.status(200).json({ success: true, message: 'Quiz unlocked successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'All previous lessons must be completed before unlocking this quiz.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const requestUnlockLab = async (req, res) => {
  const { classroomId, courseId, chapterId, labId } = req.body;
  const studentId = req.user._id;
  const currentId = labId;

  try {
    const allPreviousCompleted = await arePreviousItemsCompleted(classroomId, courseId, currentId, studentId, 'lab');
    if (allPreviousCompleted) {
      let progress = await Progress.findOne({ classroomId, studentId, courseId, chapterId, labId });
      if (!progress) {
        progress = new Progress({ classroomId, studentId, courseId, chapterId, labId, unlocked: true });
      } 
      else if (progress.unlocked) {
        return res.status(400).json({ success: false, message: 'Lab is already unlocked.' });
      }
      else {
        progress.unlocked = true;
      }
      await progress.save();
      res.status(200).json({ success: true, message: 'Lab unlocked successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'All previous items must be completed before unlocking this lab.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
    if (allPreviousCompleted) {
      let progress = await Progress.findOne({ classroomId, studentId, courseId, chapterId });
      if (!progress) {
        progress = new Progress({ classroomId, studentId, courseId, chapterId, unlocked: true });
      } 
      else if (progress.unlocked) {
        return res.status(400).json({ success: false, message: 'Chapter is already unlocked.' });
      }
      else {
        progress.unlocked = true;
      }
      await progress.save();
      res.status(200).json({ success: true, message: 'Chapter unlocked successfully.' });
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
export const getChaptersProgress = async (req, res) => {
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

// Endpoint to get lesson prozgress
export const getLessonsProgress = async (req, res) => {
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
  const { classroomId, chapterId } = req.params;
  const studentId = req.user._id
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom.students.includes(studentId)) {
      return res.status(403).json({ success: false, message: 'You are not enrolled in this classroom.' });
    }

    const chapterProgress = await getProgress(classroomId, studentId, req.body.courseId, chapterId);
    res.status(200).json({ progress: chapterProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating chapter progress', error });
  }
};
export const getStudentProgress = async (req, res) => {
  const { classroomId, studentId } = req.params;

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ success: false, message: 'Classroom not found.' });
    }

    if (!classroom.students.includes(studentId)) {
      return res.status(403).json({ success: false, message: 'Student is not enrolled in this classroom.' });
    }

    let progress = await Progress.find({ classroomId, studentId })

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error getting student progress', error });
  }
};