import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authService } from "./services/authService";
import { courseService } from "./services/coursesService";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      console.log("prepareHeaders is called");
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user); 
      if (user && user.token) {
        headers.set("authorization", `Bearer ${user.token}`);
      } else {
        console.log("Token is null");
      }
      return headers;
    },
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
