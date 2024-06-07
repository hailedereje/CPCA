import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;