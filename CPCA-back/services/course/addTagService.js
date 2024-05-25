import Course from "../../models/course.js"

export const addTagsService = async ({ courseId, tags }) => {
  await Course.findById(courseId)
    .then(async (course) => {
      tags.forEach(tag => {
        if (!course.tags.includes(tag)) {
          course.tags.push(tag);
        }
      });
      await course.save()
    }).catch(err => {
      console.error(err)
      throw new Error(err)
    })
}