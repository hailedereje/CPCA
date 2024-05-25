import { deleteLessonItemService } from "../../services/lesson/deleteLessonItemService.js"

export const deleteLessonItemController = async(req,res) => {
    try {
        const {lessonId, lessonItemId} = req.params
        console.log(lessonId,lessonItemId)
        await deleteLessonItemService(lessonId,lessonItemId)
            .then(() => res.status(200).send({message: "lesson item deleted"}))
            .catch(err => res.status(500).send(err.message))
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "somwthing went wrong"})
    }
}