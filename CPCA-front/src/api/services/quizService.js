export const quizService = (builder) => {
    return {
        createQuiz: builder.mutation({
            query: (data) => ({
              url: `/quiz/new`,
              method: "post",
              body: data,
            }),
        }),
        addQuestion: builder.mutation({
            query: (data, id) => ({
              url: `/quiz/add_new_question/:${id}`,
              method: "post",
              body: data,
            }),
        }),
        updateQuiz: builder.mutation({
            query: (data, id) => ({
              url: `/quiz/update/:${id}`,
              method: "post",
              body: data,
            }),
        }),
    }
}