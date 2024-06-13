import mongoose from 'mongoose';

const { Schema } = mongoose;

const contentSchema = new Schema({
  type: { type: String },
  value: {
    language: String,
    content: String,
     _id: false ,
  }

}, );

const lessonSchema = new Schema({
  title: { type: String, required: true },
  content: {
    type: [contentSchema],
    default: []
  },
  chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
}, {
  timestamps: true
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;