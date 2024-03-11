import mongoose, { Schema } from "mongoose";

const progressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to course
  // Other progress-related fields
});

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
