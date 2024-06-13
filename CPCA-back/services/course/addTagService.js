import Course from "../../models/course.js"

export const addTagsService = async ({ courseId, tags }) => {
  await Course.findById(courseId)
}