import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authService } from "./services/authService";
import { courseService } from "./services/coursesService";
import { quizService } from "./services/quizService";
import { profileService } from "./services/profileServices";
import { classroomService } from "./services/classroomService";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
     baseUrl: "http://localhost:5000/api/v1",
    credentials: 'include'
  }),
  
  endpoints: (builder) => ({
    ...authService(builder),
    ...courseService(builder),
    ...quizService(builder),
    ...profileService(builder), 
    ...classroomService(builder), 
    
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
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
} = api;
