import Course from "../../models/course.js"

export const addDescriptionService = async ({ courseId,description }) => {
    const course = await Course.findById(courseId)
    course.description = description
    course.save()
}