import * as yup from "yup"

export const renameChapterSchema = yup.object({
    id: yup.string().required(),
    title: yup.string().required().min(4)
})