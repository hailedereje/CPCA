import * as yup from "yup"

export const addLessonItemSchema = yup.object().shape({
    lessonId: yup.string().required(),
    type: yup.string().required(),
    value : yup.object().shape({
        language: yup.string().required(),
        content: yup.string().required()
    })
})