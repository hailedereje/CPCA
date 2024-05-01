import { get } from "lodash"

export const lessonService = (builder) => {
    return {
        getAllLessons: builder.query({
            query: () => ({
                url: "/lessons",
                method: "get",
            }),
        }), 
        getLesson: builder.query({
            query: (id) => ({
                url: `/lessons/${id}`,
                method: "get",
            }),
        }), 
    }
}