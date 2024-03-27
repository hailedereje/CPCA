import mongoose from 'mongoose';

const { Schema } = mongoose;

const lessonSchema = new Schema({
  courseId: {type: String},
  title: { type: String, required: true },
  content: { type: String },
  attachedFiles: [{ type: String }], // store file URLs or paths
  courseImages: [{ type: String }], // store image URLs or paths
  courseVideos: [{ type: String }], // store video URLs or paths
  codeSnippets: [{ type: String }],
  exercises: [{ type: String }],
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
