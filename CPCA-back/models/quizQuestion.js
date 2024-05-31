import mongoose, { Schema } from "mongoose";

const quizQuestionSchema = new Schema({
    question: { type: String, required: true },
    options: [ 
        { 
            option: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },  
            _id: false
        }
    , ],
    quizId: { type: mongoose.Schema.Types.ObjectId,ref: "Quiz", required: true},
},{ timestamps: true });

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);
export default QuizQuestion;
