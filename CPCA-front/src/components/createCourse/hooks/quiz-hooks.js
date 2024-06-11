import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { completeQuiz, createQuestion, createQuiz, fetchQuiz, updateQuestion } from "./actions"
import { showErrorToast, showSuccessToast } from "@/toasts/toast"
import Dexie from "dexie"
import { useNavigate } from "react-router-dom"

export const db = new Dexie('quiz_db')

db.version(1).stores({
    draftAnswer: '++id,questionId,answer'
})

export const useGetQuiz = (quizId) => {
    return useQuery({
        queryKey: ['quiz',quizId],
        queryFn: () => fetchQuiz(quizId),
        staleTime: 1000 * 6 * 300,
        retry:2,
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

export const useCompleteQuiz = (quizId) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: completeQuiz,
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['quiz',quizId]})
            // showSuccessToast("quiz submitted successfully successfully")
            // navigate('/')
        },
        onError: () => {
            showErrorToast("failed to submite quiz")
        }
    })
}

export const useCloseQuiz = (quizId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => {},
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['quiz',quizId]})
        }
    })
}
