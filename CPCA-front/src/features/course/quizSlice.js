import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  instruction: "",
  duration: 0,
  questions: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    createQuiz: (state, action) => {
      state.title = action.payload.title;
      state.instruction = action.payload.instruction;
      state.duration = action.payload.duration;
    },
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload]
    },
    updateQuiz: (state, action) => {
      state.title = action.payload.title;
      state.instruction = action.payload.instruction;
      state.duration = action.payload.duration;
    },
    addInstruction: (state,action) => {
      const { instruction } = action.payload
      state.instruction = instruction;
    }
  },
});

export const { addQuestion,addInstruction,updateQuiz,createQuiz } = quizSlice.actions;
export default quizSlice.reducer;
