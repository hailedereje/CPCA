import Chapter from "../../models/chapter.js";
import Course from "../../models/course.js";
import Lesson from "../../models/lesson.js";

export const deletChapterController = async (req, res) => {
    try {
        const { chapterId,courseId } = req.query;
        const {lessonIds} = req.body

         await Course.findByIdAndUpdate(courseId, { $pull: { chapters: chapterId } });
         await Chapter.findByIdAndDelete(chapterId);

         if(lessonIds?.length > 0){
            await Lesson.deleteMany({ _id: { $in: lessonIds } });
         }

        return res.status(200).json({ message: "Chapter deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" ,error:error.message});
    }
}