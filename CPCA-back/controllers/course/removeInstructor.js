import { Course, User } from '../../models/index.js';

export const removeInstructor =  async (req, res) => {
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
  
    const index = course.instructors.indexOf(instructor._id);
    if (index === -1) {
      return res.status(400).json({ error: 'Instructor not assigned to this course' });
    }
  
    course.instructors.splice(index, 1);
    await course.save();
  
    res.status(200).json({ message: 'Instructor removed successfully' });
  };