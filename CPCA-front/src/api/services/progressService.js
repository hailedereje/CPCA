// src/services/progressService.js

export const progressService = (builder) => ({
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

  // Get lessons progress for a specific chapter in a course
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
    }),
  }),
});
