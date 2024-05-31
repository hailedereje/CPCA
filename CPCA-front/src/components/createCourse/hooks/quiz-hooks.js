import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createQuestion, createQuiz, fetchQuiz, updateQuestion } from "./actions"
import { showErrorToast, showSuccessToast } from "@/toasts/toast"

export const useGetQuiz = (quizId) => {
    return useQuery({
        queryKey: ['quiz',quizId],
        queryFn: () => fetchQuiz(quizId),
        staleTime: 1000 * 6 * 300,
        retry:3,
        refetchInterval:false
    })
}

export const useCreateQuestion = (quizId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createQuestion,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['quiz',quizId]})
            showSuccessToast("question created successfully")
        },
        onError: () => {
            showErrorToast("failed to create question")
        }
    })
}

export const useUpdateQuestion = (quizId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({data,questionId}) => updateQuestion(data,questionId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['quiz',quizId]})
            showSuccessToast("question updated successfully")
        },
        onError: () => {
            showErrorToast("failed to update question")
        }
    })
}
