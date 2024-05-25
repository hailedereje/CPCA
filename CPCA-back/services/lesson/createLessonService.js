import Chapter  from "../../models/chapter.js"
import Lesson from "../../models/lesson.js"
export const createLessonService = async(data) => {
    const { chapterId,title } = data
    const chapter = await Chapter.findById(chapterId)
    if(!chapter) {
        throw new Error()
    }
    const lesson = await Lesson.create({title})

    chapter.lessons.push(lesson._id)
    await chapter.save()
    return lesson
}