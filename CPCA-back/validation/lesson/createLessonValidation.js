import * as yup from "yup"

export const createLessonSchema = yup.object({
    chapterId: yup.string().required(),
    title: yup.string().required()
})