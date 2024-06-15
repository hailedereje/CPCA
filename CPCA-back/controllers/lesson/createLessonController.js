import Lesson from "../../models/lesson.js"
import { createLessonService } from "../../services/lesson/createLessonService.js"

export const createLessonController = async (req,res) => {
    try {
        await createLessonService(req.body).then((lesson) => res.status(200).send({lesson, message: "lesson add successfully"}))
    }catch(err) {
        console.log(err)
        return res.status(500).send({message: "some error happend",err})
    }
}

export const renameLesson = async (req,res) => {
    try {
        const { lessonId, title } = req.body
        const lesson = await Lesson.findByIdAndUpdate(lessonId , {title})
        if(!lesson) {
            return res.status(404).send({message: "lesson not found"})
        }
        return res.status(200).send({message: "lesson updated successfully"})
    }catch(err) {
        console.log(err)
        return res.status(500).send({message: "some error happend",err})
    }
}