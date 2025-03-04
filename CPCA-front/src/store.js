import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import courseReducer from './features/course/courseSlice'; 
import { api } from "./api";
import topicReducer from './features/course/topicSlice';
import createCourseReducer from "./features/course/createCourse";
import quizReducer from './features/course/quizSlice'
import editorReducer from "./features/editor/editorSlice";
import socketReducer from "./features/forum/socketSlice";
import courseSidebarReducer from "./features/course/coursSidebarSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userState: userReducer,
    courseState: courseReducer,
    topicState: topicReducer,
    createCourseState: createCourseReducer,
    courseInputState: courseSidebarReducer,
    quizState: quizReducer,
    editorState: editorReducer,
    socketState: socketReducer
  },
  devTools: true, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware) 
});

