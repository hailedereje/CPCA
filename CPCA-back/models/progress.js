import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  answer: { type: String, required: true },
  correct: { type: Boolean }
});

const progressSchema = new mongoose.Schema({
  classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter'},
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab' },
  completed: { type: Boolean, default: false },
  unlocked: { type: Boolean, default: false }, 
  score: { type: Number},
  totalScore: { type: Number},
  answers: [answerSchema],
  timeSpent: {type: Number},
  lastAccessed: { type: Date}
});

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;