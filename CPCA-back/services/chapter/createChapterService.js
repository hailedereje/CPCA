import Chapter from "../../models/chapter.js"
import Course from "../../models/course.js"

export const createChapterService = async(data) => {
    const {courseId,title} = data
    const chapter = await Chapter.create({title,courseId})
    const course = await Course.findById(courseId)
    course.chapters.push(chapter._id)
    await course.save()
    await chapter.save();
}