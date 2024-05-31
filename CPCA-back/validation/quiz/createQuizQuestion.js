import * as yup from 'yup';

export const questionValidation = yup.object().shape({
    question: yup.string().required('Question is required'),
    options: yup.array().of(
      yup.object().shape({
        option: yup.string().required('Option is required'),
        isCorrect: yup.boolean().required('Correctness is required')
      }).required("Choice is required")
    ).min(2, "At least two choice is required"),
    quizId: yup.string().required('QuizId is required')
  });