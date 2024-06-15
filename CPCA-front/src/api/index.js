import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authService } from "./services/authService";
import { courseService } from "./services/coursesService";
import { quizService } from "./services/quizService";
import { profileService } from "./services/profileServices";
import { classroomService } from "./services/classroomService";
import { progressService } from "./services/progressService";

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1`,
    credentials: 'include', 
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*')
      return headers
    },
  }),
  
  endpoints: (builder) => ({
    ...authService(builder),
    ...courseService(builder),
    ...quizService(builder),
    ...profileService(builder), 
    ...classroomService(builder), 
    ...progressService(builder)
    
  }),
});

export const {

  // user endpoints 
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useEditUserInfoMutation,
  useFetchUserProfileQuery,

  // courses endpoints
  useGetAllCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useAddPrerequistesMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetLessonsQuery,
  useGetLessonQuery,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useCreateClassroomMutation,
  useGetClassroomsByInstructorIdQuery,
  useGetClassroomsByUserIdQuery,
  useArchiveClassroomQuery,
  useDeleteClassroomMutation,
  useInviteStudentsMutation,
  useJoinClassroomMutation,
  useEnrollStudentMutation,
  useGetClassroomByIdQuery,

  // progress endpoints 
  useGetChaptersProgressQuery, 
  useGetLessonsProgressQuery,
  useGetLabsProgressQuery,
  useGetQuizzesProgressQuery,
  useCalculateChapterProgressMutation,
  useCalculateCourseProgressMutation, 
  useCompleteLessonMutation,
  useCompleteLabMutation,
  useTrackTimeMutation,
  useSubmitQuizProgressMutation,
  useSubmitPracticeProgressMutation,
  useRequestUnlockChapterMutation,
  useRequestUnlockLessonMutation,
  useRequestUnlockLabMutation,
  useRequestUnlockQuizMutation,
  useGetStudentProgressQuery, // Add this line

  // progress enpoints for the instructor
  useGetStudentChaptersProgressQuery, 
  useGetStudentLessonsProgressQuery, 
  useGetStudentLabsProgressQuery, 
  useGetStudentQuizzesProgressQuery, 
  useCalculateStudentCourseProgressMutation,
  useCalculateStudentChapterProgressMutation,
} = api;
