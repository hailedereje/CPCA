import * as yup from 'yup';
export const quizSchema = yup.object().shape({
    courseId: yup.string().required('Course ID is required.'),
    chapterId: yup.string().required('Chapter ID is required.'),
    title: yup.string().required('Title is required.').min(3, 'Title must be at least 3 characters long.').max(30, 'Title cannot be longer than 100 characters.'),
    duration: yup.number().required('Duration is required.').positive('Duration must be a positive number.').min(15, "a quiz takes maximum of 15 mins."),
    instruction: yup.string().required('Instruction is required.').min(100, 'Instruction must be at least 100 characters long.'),
});

export const quizAnswerValidator  = yup.object().shape({
    quizId: yup.string().required('Quiz ID is required.'),
    questions: yup.array().of(
        yup.object().shape({
            questionId: yup.string().required('Question ID is required.'),
            answerId: yup.string().required('Answer is required.'),
        })
    ).required('Questions are required.')
})