import Course from "../../models/course.js";
import Chapter from "../../models/chapter.js";
import Lab from "../../models/lab.js";
import QuizQuestion from "../../models/quizQuestion.js";
import mongoose from "mongoose";
import Quiz from "../../models/quiz.js";

export const deleteCourse = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const { id } = req.params;

        const result = await Course.findByIdAndDelete(id);
        console.log("result",result)
        await Lab.deleteMany({ courseId: id });

        const chapters = await Chapter.find({ courseId: id });
        const quizIds = chapters.map(chapter => chapter.quiz);

        await QuizQuestion.deleteMany({ quizId: { $in: quizIds } });
        await Quiz.deleteMany({ _id: { $in: quizIds } });
        await Chapter.deleteMany({ courseId:id });

        await session.commitTransaction();
        session.endSession();
        
        return res.status(200).json({ message: "Course deleted successfully" });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};