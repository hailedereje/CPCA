import mongoose, { Schema } from "mongoose";

export const classroomSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    instructorId: { type: Schema.Types.ObjectId, ref:"User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref:"Course", required: true },
    students: { type: [Schema.Types.ObjectId], ref:"User", default: [] },
    discussion: { type: Schema.Types.ObjectId, ref:"Discussion", default: null },
  },
  { timestamps: true }
);

const Classroom = mongoose.model("Classroom", classroomSchema);

export default Classroom;
