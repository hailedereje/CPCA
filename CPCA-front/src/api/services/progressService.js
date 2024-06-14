// src/services/progressService.js

export const progressService = (builder) => ({
  // Existing methods...

  // Get chapters progress for a specific course in a classroom
  getChaptersProgress: builder.query({
    query: ({ classroomId, courseId }) => ({
      url: `/progress/chapters/${classroomId}/${courseId}`,
      method: 'GET',
    }),
  }),

  // Get lessons progress for a specific chapter in a course
  getLessonsProgress: builder.query({
    query: ({ classroomId, courseId, chapterId }) => ({
      url: `/progress/lessons/${classroomId}/${courseId}/${chapterId}`,
      method: 'GET',
    }),
  }),

  // Get labs progress for a specific chapter in a course
  getLabsProgress: builder.query({
    query: ({ classroomId, courseId }) => ({
      url: `/progress/labs/${classroomId}/${courseId}`,
      method: 'GET',
    }),
  }),

  // Get quizzes progress for a specific course
  getQuizzesProgress: builder.query({
    query: ({ classroomId, courseId }) => ({
      url: `/progress/quizzes/${classroomId}/${courseId}`,
      method: 'GET',
    }),
  }),

  // Calculate progress for a specific chapter
  calculateChapterProgress: builder.mutation({
    query: ({ classroomId, chapterId, data }) => ({
      url: `/progress/chapter/${classroomId}/${chapterId}`,
      method: 'POST',
      body: data,
    }),
  }),

  // Calculate overall progress for a specific course
  calculateCourseProgress: builder.mutation({
    query: ({ classroomId, courseId, data }) => ({
      url: `/progress/course/${classroomId}/${courseId}`,
      method: 'POST',
      body: data,
    }),
  }),

  // Complete a lesson (only accessible to students)
  completeLesson: builder.mutation({
    query: (data) => ({
      url: '/progress/submit_lesson_progress',
      method: 'POST',
      body: data,
    }),
  }),

  // Complete a lab (only accessible to students)
  completeLab: builder.mutation({
    query: (data) => ({
      url: '/progress/submit_lab_progress',
      method: 'POST',
      body: data,
    }),
  }),

  // Track time spent on a lesson or activity
  trackTime: builder.mutation({
    query: (data) => ({
      url: '/progress/track_time',
      method: 'POST',
      body: data,
    }),
  }),

  // Submit progress for a quiz
  submitQuizProgress: builder.mutation({
    query: (data) => ({
      url: '/progress/submit_quiz_progress',
      method: 'POST',
      body: data,
    }),
  }),

  // Submit progress for a practice
  submitPracticeProgress: builder.mutation({
    query: (data) => ({
      url: '/progress/submit_practice_progress',
      method: 'POST',
      body: data,
    }),
  }),

  // Request to unlock a chapter
  requestUnlockChapter: builder.mutation({
    query: (data) => ({
      url: '/progress/request_unlock_chapter',
      method: 'POST',
      body: data,
    }),
  }),

  // Request to unlock a lesson
  requestUnlockLesson: builder.mutation({
    query: (data) => ({
      url: '/progress/request_unlock_lesson',
      method: 'POST',
      body: data,
    }),
  }),

  // Request to unlock a lab
  requestUnlockLab: builder.mutation({
    query: (data) => ({
      url: '/progress/request_unlock_lab',
      method: 'POST',
      body: data,
    }),
  }),

  // Request to unlock a quiz
  requestUnlockQuiz: builder.mutation({
    query: (data) => ({
      url: '/progress/request_unlock_quiz',
      method: 'POST',
      body: data,
    })
  }),

  // Get progress for a specific student
  getStudentProgress: builder.query({
    query: ({ classroomId, studentId }) => ({
      url: `/progress/${classroomId}/student/${studentId}`,
      method: 'GET',
    }),
  }),

  // New methods for individual student progress
  getStudentChaptersProgress: builder.query({
    query: ({ classroomId, studentId }) => ({
      url: `/progress/${classroomId}/student/${studentId}/chapters`,
      method: 'GET',
    }),
  }),

  getStudentLessonsProgress: builder.query({
    query: ({ classroomId, studentId, chapterId }) => ({
      url: `/progress/${classroomId}/student/${studentId}/lessons/${chapterId}`,
      method: 'GET',
    }),
  }),

  getStudentLabsProgress: builder.query({
    query: ({ classroomId, studentId }) => ({
      url: `/progress/${classroomId}/student/${studentId}/labs`,
      method: 'GET',
    }),
  }),

  getStudentQuizzesProgress: builder.query({
    query: ({ classroomId, studentId }) => ({
      url: `/progress/${classroomId}/student/${studentId}/quizzes`,
      method: 'GET',
    }),
  }),

});
