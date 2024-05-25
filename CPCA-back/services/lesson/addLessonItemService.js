import Lesson from "../../models/lesson.js"

export const addLessonItemService = async(lessonId,type,value,idx) => {
   const lesson =  await Lesson.findById(lessonId)
   if(!lesson) {
    throw new Error("lesson not found")
}
console.log("index",idx)
    lesson.content.splice(idx+1,0,{type,value})
    await lesson.save()

}