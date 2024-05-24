import Lesson from "../../models/lesson.js"
export const getLessonService = async (lessonId) => {
    const lesson = await Lesson.findById(lessonId)
    if(!lesson) { throw new Error("lesson not found") }
    return lesson
}