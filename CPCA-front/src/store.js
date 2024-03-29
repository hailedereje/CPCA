import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userState: userReducer,
  },
  devTools: true, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware) 
});

