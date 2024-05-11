import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  objectives: [{ type: String }], // Array of objectives
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }], // Array of chapters references
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // requests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
});

const Course = mongoose.model("Course", courseSchema);
export default Course;