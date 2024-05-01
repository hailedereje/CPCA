import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import courseReducer from './features/course/courseSlice'; 
import { api } from "./api";
import topicReducer from './features/course/topicSlice';
import createCourseReducer from "./features/course/createCourse";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userState: userReducer,
    courseState: courseReducer,
    topicState: topicReducer,
    createCourseState: createCourseReducer
  },
  devTools: true, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware) 
});

