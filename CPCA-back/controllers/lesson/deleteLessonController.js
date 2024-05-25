import Lesson from '../../models/lesson.js';
import Chapter from "../../models/chapter.js"

export   const deleteLessonController = async (req, res) => {
    try {
       
        const { lessonId,chapterId } = req.query;

        const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
        const deletedChapter = await Chapter.findByIdAndDelete(chapterId);

        if (!deletedLesson ) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        if(!deletedChapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }

        return res.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

