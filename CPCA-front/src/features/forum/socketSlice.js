import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
  socket: null
};

export const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;
    },
    addUsers(state, action) {
      state.onlineUsers = action.payload;
      console.log("state", state.onlineUsers);
    },
    removeUsers(state, action) {
      console.log("remove", action.payload);
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user._id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSocket, addUsers, removeUsers } = socketSlice.actions;

export default socketSlice.reducer;
