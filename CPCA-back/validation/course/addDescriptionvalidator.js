import * as yup from "yup"

export const addDescriptionSchema  = yup.object().shape({
    courseId: yup.string().required(),
    description: yup.string().required(),
})