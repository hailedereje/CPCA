import User from "../../models/user.js";
import Quiz from "../../models/quiz.js";

export const getInstructorActivity = async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' });
    const quizzes = await Quiz.find();

    const data = instructors.map(instructor => ({
      name: instructor.username,
      value: quizzes.filter(quiz => quiz.instructorId.equals(instructor._id)).length
    }));

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
