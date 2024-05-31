import { Chapter, Quiz } from "../../models/index.js";

export const createQuizController = async (req, res) => {
    try {
        const { courseId,chapterId, title, instruction, duration } = req.body;
        const quiz = new Quiz({
            courseId,
            chapterId,
            title,
            instruction,
            duration,
        });

        const chapter = await Chapter.findById(chapterId); 
        if(!chapter){
            return res.status(404).json({ error: 'Chapter not found' });
        }
        chapter.quiz = quiz._id;
        await quiz.save();
        await chapter.save();

        return res.status(201).json({ message: 'Quiz created successfully'});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}