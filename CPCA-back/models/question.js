import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  choices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Choice' }],
  correctAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Choice' }, // Reference to the correct choice
},{timestamps:true});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
