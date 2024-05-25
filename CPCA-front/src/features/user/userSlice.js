import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";


const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};



const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || 'dracula';
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const initialState = {
  isSidebarOpen: true,
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   toggleTheme: (state) => {
      state.theme = state.theme === 'dracula' ? 'light' : 'dracula';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setUser: (state, action) => {
      const user = {
        ...action.payload.user,
        _id: action.payload.userId,
        token: action.payload.jwt,
      };
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
        const user = {
          ...action.payload.user,
          _id: action.payload.userId,
          token: action.payload.jwt,
        };
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

// console.log(userSlice.reducer);
export const { setUser, logoutUser, toggleSidebar, toggleTheme } =
  userSlice.actions;

export default userSlice.reducer;
