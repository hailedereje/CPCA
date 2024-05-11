import * as yup from 'yup';

export const CreateCourseValidator = yup.object({
  name: yup.string()
    .required('Name is required')
    .min(5, 'Name must be at least 5 characters long')
    .max(20, 'Name must be at most 20 characters long'),
  author: yup.string()
    .required('author is required')
    .min(5, 'author must be at least 5 characters long')
    .max(20, 'author must be at most 20 characters long'),
  duration: yup.string()
    .required('duration is required')
    .min(5, 'duration must be at least 5 characters long')
    .max(20, 'duration must be at most 20 characters long'),
  level: yup.string() // Add confirmPassword validation
    .required('duration is required')
    .min(5, 'duration must be at least 5 characters long')
    .max(20, 'duration must be at most 20 characters long'), // Ensure passwords match
});

// export const UserLoginValidator = yup.object({
//   email: yup.string()
//     .required('Email is required')
//     .email('Invalid email format'),
//   password: yup.string()
//     .required('Password is required')
//     .min(5, 'Password must be at least 5 characters long')
//     .max(10, 'Password must be at most 5 characters long')
// })