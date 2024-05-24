import * as yup from 'yup';

export const createCourseSchema = yup.object().shape({
  title: yup.string().required().min(5).max(100),
  author: yup.string().required().min(5).max(20),
  level: yup.string().required().oneOf(["BEGINER", "INTERMEDIATE", "ADVANCED"]),
  duration: yup.number().required().min(1).max(5),
});