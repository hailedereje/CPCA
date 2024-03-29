import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authService } from "./services/authService";
import { courseService } from "./services/coursesService";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: 'include'
  }),
  
  endpoints: (builder) => ({
    ...authService(builder),
    ...courseService(builder),
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
