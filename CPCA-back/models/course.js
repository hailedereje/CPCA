import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({
  name: { type: String, required: true }, 
  description: { type: String, required: true },
  author: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  duration: { type: String, required: true }, 
  objective: { type: String }, 
  tags: { type: [String] }, 
  prerequisites: { type: [String] }, 
  chapters: { type: [Schema.Types.ObjectId], ref: 'Chapter' }, 
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' },
  isPublished: { type: Boolean, default:false }
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;