export const courseService = (builder) => {
  return {
    getAllCourses: builder.query({
      query: () => ({
        url: "/courses/all",
        method: "get",
      }),
    }),
    getCourse: builder.query({
      query: (id) => {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
          url: `/courses/${id}`,
          method: "get",
        };
      },
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/new",
        method: "post",
        body: data,
      }),
    }),
    addPrerequistes: builder.mutation({
      query: (data) => ({
        url: "/courses/add-prerequisites",
        method: "post",
        body: data,
      }),
    }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "patch",
        body: data,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "delete",
      }),
    }),
    getLessons: builder.query({
      query: (courseId) => `courses/${courseId}/lessons`,
    }),

    getLesson: builder.query({
      query: ({ courseId, lessonId }) =>
        `courses/${courseId}/lessons/${lessonId}`,
    }),

    updateLesson: builder.mutation({
      query: ({ courseId, lessonId, data }) => ({
        url: `courses/${courseId}/lessons/${lessonId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteLesson: builder.mutation({
      query: ({ courseId, lessonId }) => ({
        url: `courses/${courseId}/lessons/${lessonId}`,
        method: "DELETE",
      }),
    }),
  };
};
