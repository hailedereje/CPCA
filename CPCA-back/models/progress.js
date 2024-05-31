import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  answer: { type: String, required: true },
  correct: { type: Boolean }
});

const progressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  practiceQuestionId: { type: mongoose.Schema.Types.ObjectId, ref: 'PracticeQuestion' },
  completed: { type: Boolean, default: false },
  unlocked: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  answers: [answerSchema],
  timeSpent: {type: Date, default: Date.now}
});

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;