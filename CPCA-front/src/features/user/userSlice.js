import { createSlice } from "@reduxjs/toolkit";
import {api} from '../../api'
const getUserFromLocalStorage = () => {
 return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
 isSidebarOpen: true, 
 user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen; 
    },
    setUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.setItem("user", null);
    },
 },
 extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.loginUser.matchFulfilled, (state, action) => {
        // Assuming the payload contains user and jwt
        console.log(action.payload); 
        const user = { ...action.payload.user, token: action.payload.jwt };
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addMatcher(api.endpoints.loginUser.matchRejected, (state) => {
        // Handle login failure
        state.user = null;
        localStorage.setItem("user", null);
      });
 },
});

console.log(userSlice.reducer);
export const { setUser, logoutUser, toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
