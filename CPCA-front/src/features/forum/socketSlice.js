import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
};

export const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    addUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    removeUsers(state, action) {
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user._id !== action.payload
      );
    },
  },
});

export const { setSocket, addUsers, removeUsers } = socketSlice.actions;

export default socketSlice.reducer;
