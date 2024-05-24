import * as yup from 'yup'

export const addTagsSchema = yup.object().shape({
    courseId: yup.string().required(),
    tags: yup.array().of(
      yup.object().shape({
        id: yup.string().required('tagId is required'),
        title: yup.string().required('tag title is required')
      })
    )
  });