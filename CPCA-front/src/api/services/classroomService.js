
export const classroomService = (builder) => ({
  createClassroom: builder.mutation({
    query: (classroom) => ({
      url: "/classroom",
      method: "POST",   
      body: classroom,
    }),
  }),
  getClassroomById: builder.query({
    query: (id) => `/classroom/${id}`,
  }),
  getClassroomsByInstructorId: builder.query({
    query: (instructorId) => `/classroom/instructor/${instructorId}`,
  }),
  getClassroomsByUserId: builder.query({
    query: (userId) => `/classroom/student/${userId}`,
  }),
  archiveClassroom: builder.query({
    query: (id) => `classroom/${id}`,
  }),
  deleteClassroom: builder.mutation({
    query: (id) => ({
      url: `/classroom/delete/${id}`,
      method: "DELETE",
    }),
  }),
  inviteStudents: builder.mutation({
    query: (invitationData) => ({
      url: "classroom/invite",
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
