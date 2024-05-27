import mongoose, { Schema } from "mongoose";

const discussionSchema = new Schema({
  classroomId: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
  discussion: [{ type: Schema.Types.ObjectId, ref: 'DiscussionQuestion' }],
}, { timestamps: true });

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion; 