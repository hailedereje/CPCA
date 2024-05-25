import Course from "../../models/course.js"

export const addObjectiveService = async ({ courseId,objective }) => {
    const course = await Course.findById(courseId)
    course.objective = objective
    course.save()
}