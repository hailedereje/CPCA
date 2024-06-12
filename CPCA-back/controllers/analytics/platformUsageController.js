import User from "../../models/user.js";
import Course from "../../models/course.js";

export const getPlatformUsage = async (req, res) => {
  try {
    const users = await User.find();
    const courses = await Course.find();

    const data = [
      { name: 'Active Users', usage: users.filter(user => user.isActive).length },
      { name: 'Total Courses', usage: courses.length },
      // Add more metrics as needed
    ];

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
