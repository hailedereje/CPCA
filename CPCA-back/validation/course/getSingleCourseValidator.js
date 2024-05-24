import * as yup from "yup"

export const getSingleCourseSchema = yup.object().shape({
    id: yup.string().required('Course ID is required').uuid()
})