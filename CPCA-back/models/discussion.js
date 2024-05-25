import mongoose, { Schema } from "mongoose";

const discussionSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  discussion: [{ type: Schema.Types.ObjectId, ref: 'DiscussionQuestion' }],
  createdAt: { type: Date, default: Date.now },
});

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion; 