import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authService } from "./services/authService";
import { courseService } from "./services/coursesService";
import { quizService } from "./services/quizService";
import { profileService } from "./services/profileServices";

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
    ...profileService(builder)
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
} = api;
