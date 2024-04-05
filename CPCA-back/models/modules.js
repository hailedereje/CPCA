import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
    courseId: {type: String},
    title: { type: String, required: true },
    lessons: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Lesson",
        default: [],
      },
},{
    timestamps: true,
  });

const Module = mongoose.model('Module', moduleSchema);
module.exports = Module;