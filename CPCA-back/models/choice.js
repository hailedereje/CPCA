import mongoose from 'mongoose';

const ChoiceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  isCorrect: { type: Boolean, default: false },
},{timestamps:true});

const Choice = mongoose.model('Choice', ChoiceSchema);

export default Choice;
