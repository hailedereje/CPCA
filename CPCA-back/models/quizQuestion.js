import mongoose from "mongoose";

const quizQuestionSchema = mongoose.Schema({
    title: { type: String, required: true },
    question: { type: String, required: true },
    options: [
        {
        option: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        },
    ],
    correctAnswer: { type: String, required: true },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);
export default QuizQuestion;