import mongoose, { Schema } from "mongoose";

const discussionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  content: { type: String, required: true },
  codeSnippet: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked this discussion
  replies: [{ 
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    // Other reply-related fields
  }],
});


const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion; 