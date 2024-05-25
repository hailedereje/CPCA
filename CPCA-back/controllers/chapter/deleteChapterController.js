import Chapter from "../../models/chapter.js";
import Course from "../../models/course.js";

export const deletChapterController = async (req, res) => {
    try {
        const { chapterId,courseId } = req.query;
        console.log(chapterId,courseId)
         await Course.findByIdAndUpdate(courseId, { $pull: { chapters: chapterId } });
         await Chapter.findByIdAndDelete(chapterId);

        return res.status(200).json({ message: "Chapter deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" ,error:error.message});
    }
}