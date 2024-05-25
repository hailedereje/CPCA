import { updateLessonItemService } from "../../services/lesson/updateLessonItemService.js"

export const updateLessonItemController = async(req,res) => {
    try {
        const { lessonId,lessonItemId,value } = req.body
        console.log("at controller",req.body)
        await updateLessonItemService(lessonId,lessonItemId,value)
            .then(() => {
                res.status(200).json({message:"lesson item updated"})
            })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}