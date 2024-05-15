import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Name is required"],
      minlength: [5, "Name must be at least 5 characters long"],
      maxlength: [100, "Name must be at most 100 characters long"],
      unique: true,
    },

    description: { type: String,},
    chapters: { type: [Schema.Types.ObjectId], ref: "Chapter" },

    author: {
      type: String,
      required: [true, "Author is required"],
      minlength: [5, "Author must be at least 5 characters long"],
      maxlength: [20, "Author must be at most 20 characters long"],
    },

    level: {
      type: String,
      enum: ["BEGINER", "INTERMEDIATE", "ADVANCED"],
      required: [true, "Level is required"],
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"],
      minlength: [5, "Duration must be at least 5 characters long"],
      maxlength: [20, "Duration must be at most 20 characters long"],
    },

    templateImg: {
      type: String,
      // required: [true, "Enter a template Image"],
    },

    objective: { type: String },
    tags: { type: [String] },
    prerequisites: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: "Course" , required:true ,unique:true},
        courseName: { type: String, required: true ,unique:true }
      }
    ],
    instructor: { type: Schema.Types.ObjectId,ref:"User" },

  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
