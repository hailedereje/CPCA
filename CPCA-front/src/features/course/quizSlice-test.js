import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  editingQuestion: null,
  newChoice: { id: nanoid(), option: '', isCorrect: false },
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setEditingQuestion(state, action) {
      state.editingQuestion = action.payload;
    },
    updateEditingQuestion(state, action) {
      state.editingQuestion = { ...state.editingQuestion, ...action.payload };
    },
    setNewChoice(state, action) {
      state.newChoice = action.payload;
    },
    addChoice(state) {
      if (state.newChoice.option.trim()) {
        state.questions.push(state.newChoice);
        state.newChoice = { id: nanoid(), option: '', isCorrect: false };
      }
    },
    updateChoice(state, action) {
      const { id, newOption } = action.payload;
      const index = state.questions.findIndex(choice => choice.id === id);
      if (index !== -1) {
        state.questions[index].option = newOption;
      }
    },
  },
});

export const {
  setQuestions,
  setEditingQuestion,
  updateEditingQuestion,
  setNewChoice,
  addChoice,
  updateChoice,
} = questionSlice.actions;

export default questionSlice.reducer;
