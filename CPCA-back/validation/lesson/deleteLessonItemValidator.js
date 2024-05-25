import * as yup from 'yup';

export const deleteLessonItemSchema = yup.object().shape({
    lessonid: yup.string().required(),
    lessonItemId: yup.string().required()
})