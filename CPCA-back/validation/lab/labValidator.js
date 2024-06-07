import * as yup from 'yup';

export const labValidationSchema = yup.object().shape({
    courseId: yup.string().required('Course ID is required.'),
    title: yup.string().required('Title is required.').min(3, 'Title must be at least 3 characters long.').max(100, 'Title cannot be longer than 100 characters.'),
    description: yup.string().required('Description is required.').min(10, 'Description must be at least 10 characters long.'),
    labManual: yup.string().required('Lab manual is required.').min(100, 'Lab manual must be at least 100 characters long.'),
});