import Chapter from "../../models/chapter.js"

export const getChaptersService = async(courseId) => {
    console.log(courseId)
    const chapters = await Chapter.find().where({courseId})
    return chapters
}