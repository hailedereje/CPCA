import Course from "../../models/course.js"

export const createCourseService = async(data) => {
    try{
        const course = await Course.create(data)
        return { id:course._id }
    }catch(err) {
        throw new Error(err)
    }
}