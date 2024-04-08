// features/course/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../api"; // Adjust the import path as necessary

const initialState = {
  courses: [],
  selectedCourse: [], 
  status: "idle",
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
        state.selectedCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.getAllCourses.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.courses = action.payload;
        }
      )
      .addMatcher(api.endpoints.getAllCourses.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        api.endpoints.getAllCourses.matchRejected,
        (state, action) => {
          state.status = "failed";
          console.log(action.error); 
          state.error = action.error.message;
        }
      );
  },
});

export default courseSlice.reducer;

export const {setSelectedCourse} = courseSlice.actions;
