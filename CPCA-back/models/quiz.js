import mongoose from "mongoose";

const question = mongoose.Schema({
  title: { type: String },
  questions: { type: String },
  options: [{ option: String, isCorrect: Boolean, id: Number }],
  correctAnswer: { type: String },
});

const QuizSchema = mongoose.Schema({
  title: { type: String, required: true },
  instruction: {type: String},
  questions: [question],
  duration: { type: Number }, // Add duration field
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;