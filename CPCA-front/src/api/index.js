import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authService } from "./services/authService";
import { courseService } from "./services/coursesService";
import { lessonService } from "./services/lessonServices";
import { profileService } from "./services/profileServices";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1",
    baseUrl: "http://localhost:3000",
    // credentials: 'include'
  }),
  
  endpoints: (builder) => ({
    ...authService(builder),
    ...courseService(builder),
    ...lessonService(builder),
    ...profileService(builder)
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useGetAllCoursesMutation,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = api;
console.log(api);
