import { ActionTypes } from "@/components/createCourse/action.Types";
import { createSlice, nanoid } from "@reduxjs/toolkit";

const quizModal = {
  label:'',
  message:'',
  actionType:'',
  open:false,
  data:null,
  showScore:false,
  totalQuestions:1,
  score:0
}
const initialState = {
  quizModal,
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
    },
    openQuizDialog: (state, action) => {
      const {label, message, actionType, data} = action.payload;
      switch (actionType) {
        case ActionTypes.CLOSE_QUIZ:
          state.quizModal = {label,message,actionType,open: true,data: null}
          break;
        case ActionTypes.SUBMIT_QUIZ:
          state.quizModal = {label,message,actionType,open: true,data}
          break;
       
      }
    },
    closeQuizDialog: (state, action) => {
      state.quizModal.open = false;
    },
    showScoreDialog: (state, action) => {
      const {score,totalQuestions} = action.payload;
      state.quizModal = {...state.quizModal,showScore:true,score,totalQuestions}
  },
  closeScoreDialog: (state, action) => {
    state.quizModal = {...state.quizModal,showScore:false}
  },
  }
});

export const { addInstruction, updateQuiz, 
  createQuiz, addChoices, updateChoice, 
  deleteChoice,setQuestionType, openQuizDialog,
  closeQuizDialog, showScoreDialog,closeScoreDialog } = quizSlice.actions;
export default quizSlice.reducer;
