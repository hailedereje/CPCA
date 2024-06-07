import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String},
  token: { type: String, required: true },
  classroomId: { type: String, required: true },
  classroomName: { type: String, required: true },
  instructor: { type: String, required: true },
  accepted: { type: Boolean, default: false },
  invitedAt: { type: Date, default: Date.now }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;
