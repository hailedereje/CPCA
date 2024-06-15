import { ActionTypes } from '@/components/createCourse/action.Types';
import { createSlice } from '@reduxjs/toolkit';

const initialValue = { 
  courseId: '',
  chapterId: '',
  lessonIds: [],
  lessonId: '',
  lessonItemId:'',
  userId: '',
  actionType: '',
  message: '',
  showConfirmation: false,
  value:'',
  label:'',
  show: false
}

const lessonItem = {
  actionType:'',
  lessonId:'',
  lessonItemId:'',
  idx:'',
  value:{
    language:'javascript',
    content:''
  }
}

const initialState = {
 formState:initialValue,
 activeLesson: {
  isEmpty:true,
  isContent:false,
  courseId:'',
  chapterId:'',
  lessonId:'',
  
 },
 lessonItem,
 showTextEditor:false,
 showCodeEditor:false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addChapter : (state,action) => {
      const { courseId,label,actionType } = action.payload
      state.formState = {...state.formState,courseId,label,actionType,show:true }
    },
    renameChapter: (state,action) => {
      const { courseId,chapterId, actionType, label ,value } = action.payload
      state.formState = {...state.formState,courseId,chapterId,actionType,label,value,show:true}
    },
    addLesson: (state,action) => {
      const { courseId,chapterId,label,actionType } = action.payload
      state.formState = {...state.formState,chapterId,courseId,label,actionType,show:true}
    },
    renameLesson : (state,action) => {
      const { lessonId,actionType,label,value } = action.payload
      state.formState = {...state.formState,lessonId,actionType,label,value,show:true}
    },
    deleteChapterConfirmation:(state,action) => {
      const {courseId,chapterId,message } = action.payload
      state.formState = {...state.formState,courseId,chapterId,message,showConfirmation:true}
    },
    openConfirmationDialog: (state,action) => {
      const { courseId = '',chapterId = '',lessonId = '',lessonItemId = '',userId='',actionType,message,lessonIds } = action.payload
      state.formState = { ...state.formState,courseId,chapterId,lessonId,userId,lessonItemId,actionType,message,lessonIds,showConfirmation:true }
    },
    deleteLesson: (state,action) => {

    },

    createLessonItem: (state,action) => {
      const { type,lessonId,actionType,idx } = action.payload
      switch (type) {
        case 'code':
          state.lessonItem = {...state.lessonItem,lessonId,type,actionType,idx,value:lessonItem.value}
          state.showCodeEditor = true
          break
        case 'text':
          state.lessonItem = {...state.lessonItem,lessonId,type,actionType,idx,value:lessonItem.value}
          state.showTextEditor = true
          break
      }
    },
    updateLessonItem: (state,action) => {
      const {lessonId, lessonItemId, type, value } = action.payload
      switch (type) {
        case 'code':
          state.lessonItem = {lessonItemId,value,actionType:ActionTypes.UPDATE_LESSON_ITEM,value}
          state.showCodeEditor = true
          break
        case 'text':
          state.lessonItem = {lessonItemId,value,actionType:ActionTypes.UPDATE_LESSON_ITEM,value}
          state.showTextEditor = true
          break
      }
    },
    setActiveLesson: (state,action) => {
      const {courseId,chapterId,lessonId,content} = action.payload
      state.activeLesson = {courseId, chapterId,lessonId,content,isEmpty:false }
    },
    setLessonItemValue: (state,action) => {
      state.lessonItem.value = action.payload
    },

    addLessonItem: (state,action) => {
      // const { type,language,content } = action.payload
      // state.activeLesson.content.push({type,value:{ language,content }})
      // state.activeLesson.isContent = true
    },
    setTitle: (state,action) => {
      state.formState.value = action.payload
    },
    closeEditor: (state,action) => {
      state.showCodeEditor = false
      state.showTextEditor = false
    },
    close: (state,action) => {
      state.formState = {...initialValue}
    }
  }
});

export const {
  addChapter,close,renameChapter,
  setTitle,addLesson,deleteChapterConfirmation,openConfirmationDialog,renameLesson,
  addLessonItem,closeEditor,createLessonItem,updateLessonItem,setLessonItemValue,setActiveLesson
  
} = uiSlice.actions;
export default uiSlice.reducer;
