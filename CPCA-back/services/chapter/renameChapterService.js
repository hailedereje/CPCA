import Chapter from "../../models/chapter.js"

export const renameChapterService = async(data) => {
    const {chapterId,title} = data
    const chapter = await Chapter.findById(chapterId)
    chapter.title = title
    await chapter.save()
}