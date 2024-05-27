import { Course, User } from '../../models';

export const assignInstructor =  async (req, res) => {
  const { email, courseId } = req.body;
  if (!email || !courseId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  const instructor = await User.findOne({ email });
  if (!instructor) {
    return res.status(404).json({ error: 'Instructor not found' });
  }

  if (course.instructors.includes(instructor._id)) {
    return res.status(400).json({ error: 'Instructor already assigned to this course' });
  }

  course.instructors.push(instructor._id);
  await course.save();

  res.status(200).json({ message: 'Instructor assigned successfully' });
};