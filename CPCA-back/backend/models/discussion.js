import mongoose, { Schema } from "mongoose";


const discussionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to course
  content: { type: String, required: true },
  // Other discussion-related fields
});

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion; 