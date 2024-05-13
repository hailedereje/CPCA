import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Name is required"],
      minlength: [5, "Name must be at least 5 characters long"],
      maxlength: [100, "Name must be at most 20 characters long"],
      unique: true,
    },

    description: { type: String, required: true },
    chapters: { type: [Schema.Types.ObjectId], ref: "Chapter" },

    author: {
      type: String,
      required: [true, "Author is required"],
      minlength: [5, "Author must be at least 5 characters long"],
      maxlength: [20, "Author must be at most 20 characters long"],
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: [true, "Level is required"],
    },

    duration: {
      type: String,
      required: [true, "Duration is required"],
      minlength: [5, "Duration must be at least 5 characters long"],
      maxlength: [20, "Duration must be at most 20 characters long"],
    },

    templateImg: {
      type: String,
      required: [true, "Enter a template Image"],
    },

    objective: { type: String },
    tags: { type: [String] },
    prerequisites: { type: [String] },
    instructor: { type: String },

  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
