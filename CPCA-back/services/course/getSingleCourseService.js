import Course from "../../models/course.js"
import Lesson from "../../models/lesson.js"

export const getSingleCourseService = async (id) => {
    const course =  await Course.findById(id)
        .populate('chapters')
        .populate({
            path: "labs",
            model:"Lab",
            select:"_id title description"
        })
        .populate({
            path: "chapters",
            populate: [
                {
                    path: "lessons",
                    model:"Lesson",
                    select:"_id title"
                },
                {
                    path: "quiz",
                    model:"Quiz",
                    select:"_id title"
                }
            ]
        })
    return course   
}