import mongoose from 'mongoose';

const { Schema } = mongoose;

const lessonSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  attachedFiles: [{ type: String }], // store file URLs or paths
  courseImages: [{ type: String }], // store image URLs or paths
  courseVideos: [{ type: String }], // store video URLs or paths
  codeSnippets: [{ type: String }],
  exercises: [{ type: String }],
}, {
  timestamps: true
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
