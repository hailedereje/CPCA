import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  tags: [{ type: String }],
  constraints: { type: String },
  sampleInput: { type: String },
  sampleOutput: { type: String },
  examples: {type: String},
});

const PracticeQuestion = mongoose.model('PracticeQuestion', QuestionSchema);

export default PracticeQuestion;
