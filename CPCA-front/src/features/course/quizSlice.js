import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  instruction: "",
  duration: 0,
  questions: [],
  quizQuestion: {
    type: "single",
    question: "",
    options: []
  }
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
    
    updateQuiz: (state, action) => {
      state.title = action.payload.title;
      state.instruction = action.payload.instruction;
      state.duration = action.payload.duration;
    },
    addInstruction: (state, action) => {
      state.instruction = action.payload.instruction;
    },
    addChoices: (state, action) => {
      const { options } = action.payload;
      state.quizQuestion.options = options
    },
    setQuestionType: (state, action) => {
      state.quizQuestion.type = action.payload.type;
    }, 
    addQuestion: (state, action) => {
      state.quizQuestion.question = action.payload.question;
    },
    updateChoice: (state, action) => {
      const { choiceId, option } = action.payload;
      const choice = state.quizQuestion.options.find(c => c.id === choiceId);
      choice.option = option;
    },
    deleteChoice: (state, action) => {
      const question = state.questions.find(q => q.id === action.payload.questionId);
      question.choices = question.choices.filter(c => c.id !== action.payload.choiceId);
    }
  },
});

export const { addInstruction, updateQuiz, createQuiz, addChoices, updateChoice, deleteChoice,setQuestionType } = quizSlice.actions;
export default quizSlice.reducer;
