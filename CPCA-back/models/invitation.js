import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
  invitedAt: { type: Date, default: Date.now }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;
