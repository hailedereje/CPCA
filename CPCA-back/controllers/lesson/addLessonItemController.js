import { addLessonItemService } from "../../services/lesson/addLessonItemService.js"

export const addLessonItemController = async(req,res) => {
    try{
        const {lessonId,type,value} = req.body
        await addLessonItemService(lessonId,type,value).then(() => res.status(200).send({message: "lessonItem add Successfully"}))
    }catch(error) {
        console.log(error)
        return res.status(500).send({error})
    }
}