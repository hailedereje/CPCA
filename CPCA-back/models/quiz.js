import mongoose, { Schema } from "mongoose";

const QuizSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required:true
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true
  },
  title: { type: String, required: true },
  instruction: {type: String, required: true},
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizQuestion",
  }],
  duration: { type: Number , required: true}, 
  
}, { timestamps: true});

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;