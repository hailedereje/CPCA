
export const courseService = (builder) => {
    return {
        getAllCourses: builder.query({
            query: () => ({
                url: '/courses',
                method: 'get'
            })
        }),
        getCourseById: builder.query({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'get'
            })
        }),
        createCourse: builder.mutation({
            query: (data) => ({
                url: '/courses',
                method: 'post',
                body: data
            })
        }),
        updateCourse: builder.mutation({
            query: (data) => ({
                url: '/courses',
                method: 'patch',
                body: data
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/course/${id}`,
                method: 'delete'
            })
        })
    }
}