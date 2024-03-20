import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      console.log(user);
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.setItem("user", null);
    },
  },
});

console.log(userSlice.reducer);
export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
