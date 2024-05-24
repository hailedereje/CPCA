import { deleteLessonItemService } from "../../services/lesson/deleteLessonItemService.js"

export const deleteLessonItemController = async(req,res) => {
    try {
        const {lessonId, lessonItemId} = req.body
        await deleteLessonItemService(lessonId,lessonItemId)
            .then(() => res.status(204))
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "somwthing went wrong"})
    }
}