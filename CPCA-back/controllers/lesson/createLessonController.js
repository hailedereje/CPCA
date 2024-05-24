import { createLessonService } from "../../services/lesson/createLessonService.js"

export const createLessonController = async (req,res) => {
    try {
        await createLessonService(req.body).then((lesson) => res.status(200).send({lesson, message: "lesson add successfully"}))
    }catch(err) {
        console.log(err)
        return res.status(500).send({message: "some error happend",err})
    }
}