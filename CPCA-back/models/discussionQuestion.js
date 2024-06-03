import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    replies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reply",
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    upvote: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    downvote: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    seen: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const DiscussionQuestion = mongoose.model("DiscussionQuestion", questionSchema);
export default DiscussionQuestion;
