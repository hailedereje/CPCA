import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    // [api.reducerPath]: api.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware) 
});

