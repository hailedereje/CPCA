import Lesson from "../../models/lesson.js"
export const deleteLessonItemService = async(lessonId,lessonItemId) => {
    const lesson = await Lesson.findById(lessonId)
    if(!lesson) {
        throw new Error("lesson not found")
    }

    lesson.content = lesson.content.filter(x => x._id !== lessonId)
    await lesson.save()
}