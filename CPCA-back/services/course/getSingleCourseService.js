import Course from "../../models/course.js"
import Lesson from "../../models/lesson.js"

export const getSingleCourseService = async (id) => {
    const course =  await Course.findById(id)
        .populate('chapters')
        .populate({
            path: "chapters",
            populate: {
                path: "lessons",
                model:"Lesson",
                select:"_id title"
            }
        })
    return course   
}