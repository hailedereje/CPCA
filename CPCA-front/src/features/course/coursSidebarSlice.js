import { ActionTypes } from '@/components/createCourse/action.Types';
import { createSlice } from '@reduxjs/toolkit';

const initialValue = { 
  courseId: '',
  chapterId: '',
  lessonId: '',
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
    deleteChapterConfirmation:(state,action) => {
      const {courseId,chapterId,message } = action.payload
      state.formState = {...state.formState,courseId,chapterId,message,showConfirmation:true}
    },
    deleteLesson: (state,action) => {

    },
    setActiveLesson: (state,action) => {
      const {courseId,chapterId,lessonId,content} = action.payload
      state.activeLesson = {courseId, chapterId,lessonId,content,isEmpty:false }
    },

    createLessonItem: (state,action) => {
      const { type,lessonId } = action.payload
      switch (type) {
        case 'code':
          state.showCodeEditor = true
          state.lessonItem.lessonId = lessonId
          state.lessonItem.value = lessonItem.value
          break
        case 'text':
          state.showTextEditor = true
          state.lessonItem.lessonId = lessonId
          state.lessonItem.value = lessonItem.value
          break
      }
    },
    updateLessonItem: (state,action) => {
      const { type,_id ,value } = action.payload
      switch (type) {
        case 'code':
          state.showCodeEditor = true
          state.lessonItem = {lessonItemId:_id,value,actionType:ActionTypes.UPDATE_LESSON_ITEM,}
          break
        case 'text':
          state.showTextEditor = true
          state.lessonItem = {lessonItemId:_id,value,actionType:ActionTypes.UPDATE_LESSON_ITEM,}
          break
      }
    },
    setLessonItemValue: (state,action) => {
      const { value } = action.payload
      state.lessonItem.value = value
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
  setTitle,addLesson,deleteChapterConfirmation,
  setActiveLesson,addLessonItem,closeEditor,createLessonItem,updateLessonItem,setLessonItemValue
  
} = uiSlice.actions;
export default uiSlice.reducer;
