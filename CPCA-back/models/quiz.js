import mongoose from "mongoose";

const QuizSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
  },
  title: { type: String, required: true },
  instruction: {type: String},
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizQuestion",
  }],
  duration: { type: Number }, // Add duration field
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;