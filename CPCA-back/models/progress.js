import mongoose, { Schema } from "mongoose";

const progressSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  currentLesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  currentPosition: { type: Number, default: 0 }, // or any other position indicator
  lastAccessedAt: { type: Date, default: Date.now },
});

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
