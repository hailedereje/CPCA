import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import courseReducer from './features/course/courseSlice'; 
import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userState: userReducer,
    courseState: courseReducer,
  },
  devTools: true, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware) 
});

