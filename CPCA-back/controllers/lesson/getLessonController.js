import { getLessonService } from "../../services/lesson/getLessonService.js"

export const getLessonController = async (req,res) => {
    try {
        const { lessonId } = req.query
        await getLessonService(lessonId)
            .then(lesson => res.status(200).send({lesson}))
    } catch(error) {
        console.log(error)
        return res.status(500).send({message: "something unexpected happen"})
    }
}