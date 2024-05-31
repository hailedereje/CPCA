
export const classroomService = (builder) => ({
  createClassroom: builder.mutation({
    query: (classroom) => ({
      url: "/classroom",
      method: "POST",   
      body: classroom,
    }),
  }),
  getClassroomsByInstructorId: builder.query({
    query: (instructorId) => `/classroom/instructor/${instructorId}`,
  }),
  getClassroomsByUserId: builder.query({
    query: (userId) => `/classroom/invite`,
  }),
  archiveClassroom: builder.query({
    query: (id) => `classroom/${id}`,
  }),
  deleteClassroom: builder.mutation({
    query: (id) => ({
      url: `/classrooms/${id}`,
      method: "DELETE",
    }),
  }),
  inviteStudents: builder.mutation({
    query: (invitationData) => ({
      url: "classrooms/invite",
      method: "POST",
      body: invitationData,
    }),
  }),
  joinClassroom: builder.mutation({
    query: ({ token, classroomId }) => ({
      url: `/classroom/join/:token`,
      method: "POST",
      body: { classroomId },
    }),
  }),
  enrollStudent: builder.mutation({
    query: (enrollData) => ({
      url: "/classroom/enroll",
      method: "POST",
      body: enrollData,
    }),
  }),
});
