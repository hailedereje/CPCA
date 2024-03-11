import mongoose , {Schema} from 'mongoose'

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to instructor
  // Other course-related fields
});

const Course = mongoose.model('Course', courseSchema);
export default Course; 