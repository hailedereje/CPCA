import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  templateImg: {type: String, required: true},
  objectives: { type: String },
  modules: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Module",
    default: [],
  },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, {
  timestamps: true,
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
