import Lesson from "../../models/lesson.js"

export const addLessonItemService = async(lessonId,type,value) => {
   const lesson =  await Lesson.findById(lessonId)
   if(!lesson) {
    throw new Error("lesson not found")
}
    lesson.content.push({type,value})
    await lesson.save()

}