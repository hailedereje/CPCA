import * as yup from "yup"

export const createChapterSchema = yup.object().shape({
    courseId: yup.string().required(),
    title: yup.string().required()
})