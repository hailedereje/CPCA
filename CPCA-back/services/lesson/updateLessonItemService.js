import Lesson from "../../models/lesson.js"

export const updateLessonItemService = async(lessonId,lessonItemId,value) => {
    const lesson = await Lesson.findById(lessonId)
    if(!lesson) {
        throw new Error("lesson not found")
    }
    lesson.content.id(lessonItemId).value = value
    lesson.save()
    
}