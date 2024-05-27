import mongoose, { Schema } from "mongoose";

export const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Name is required"],
      minlength: [5, "Name must be at least 5 characters long"],
      maxlength: [100, "Name must be at most 100 characters long"],
      unique: true,
    },

    description: { type: String,},
    chapters: { 
      type: [Schema.Types.ObjectId], 
      ref: "Chapter" ,
      default: []
    },

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
    },

    templateImg: {
      type: String,
      default:''
      // required: [true, "Enter a template Image"],
    },

    objective: { 
      type: String,
      default: '' 
    },

    tags: {
      type : [
        {
          id: { type: String },
          title: { type: String}
        }
      ],
      default: []
    },

    prerequisites: {
      type: [
        {
          id: {type: Schema.Types.ObjectId, ref: "Course"},
          title: String
        }
      ],
      default: []
    },
    instructors: { type: [Schema.Types.ObjectId],ref:"User", default: []},
    isPublished: {type: Boolean,default:false},
  },
  
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
