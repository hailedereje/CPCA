import * as yup from "yup"

export const addObjectiveSchema  = yup.object().shape({
    courseId: yup.string().required(),
    description: yup.string().required(),
})