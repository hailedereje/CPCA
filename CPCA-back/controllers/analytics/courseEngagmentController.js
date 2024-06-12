import Course from "../../models/course.js";
import User from "../../models/user.js";

export const getCourseEngagement = async (req, res) => {
  try {
    const courses = await Course.find();
    const users = await User.find();

    const data = courses.map(course => ({
      name: course.title,
      engagement: users.filter(user => user.enrolledCourses && user.enrolledCourses.includes(course._id)).length
    }));

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
