import * as yup from 'yup';

export const addPrerequisiteSchema = yup.object().shape({
  prerequisites: yup.array().of(
    yup.object().shape({
      id: yup.string().required('prerequisiteId is required'),
      title: yup.string().required('prerequisiteTitle is required')
    })
  )
});
