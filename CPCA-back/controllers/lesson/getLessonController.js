import Lesson from "../../models/lesson.js"
import { getLessonService } from "../../services/lesson/getLessonService.js"

export const getLessonController = async (req,res) => {
    try {
        const { lessonId } = req.query
        const lesson = await Lesson.findById(lessonId)
        if(!lesson) {
            return res.status(404).send({message: "lesson not found"})
        }
        return res.status(200).send({lesson})
    } catch(error) {
        console.log(error)
        return res.status(500).send({message: "something unexpected happen"})
    }
}