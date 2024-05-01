import { createSlice, nanoid } from "@reduxjs/toolkit";

const ITEM_NAME = 'topic_content';

const chapters = [
    {
        id: nanoid(), name: "chapter-1", lessons: [
            {
                id: nanoid(), name: "lesson-1", content:
                [
                    { id: nanoid(), type: "text", content: "code snipet", show: false },
                ]
            },
            {
                id: nanoid(), name: "lesson-2", content: 
                [
                    { id: nanoid(), type: "code", content: "code snipet", show: false },
                ]
            }
        ]
    }
]


const initialState = {
    chapters,
}

export const createCourseSlice = createSlice({
    name: "createCourse",
    initialState,
    reducers: {
        addChapter: (state, action) => {
            const { name } = action.payload;
            const chapter = { id: nanoid(), name: name, lessons: [] }
            state.chapters.push(chapter)

        },
        addLesson: (state, action) => {
            const { name,id } = action.payload
            const lesson = { id: nanoid(), name: name, content: [] }
            state.chapters.find(chapter => chapter.id === id).lessons.push(lesson)
        },
        renameChapter: (state, action) => {
            var { name, id } = action.payload
            state.chapters.find(chapter => chapter.id === id).name = name
        },
        renameLesson: (state, action) => {
            var { name, id, lessonId } = action.payload
            state.chapters.find(chapter => chapter.id === id).lessons.find(lesson => lesson.id === lessonId).name = name
        },
        removeChapter: (state, action) => {
            state.chapters = state.chapters.length === 1
                ? chapters
                : state.chapters.filter(chapter => chapter.id !== action.payload);
            // localStorage.setItem(ITEM_NAME, JSON.stringify(state.chapters));
        },
        updateChapter: (state, action) => {
            const { id, content } = action.payload;
            const chapter = state.chapters.find(chapter => chapter.id === id);
            if (chapter) {
                chapter.name = content;
                // localStorage.setItem(ITEM_NAME, JSON.stringify(state.chapters.map(topic => topic.id === id ? {...topic,show:false} : topic)));
            }
        },

    }
})

export const { addChapter, removeChapter, updateChapter, renameChapter, renameLesson, addLesson } = createCourseSlice.actions;
export default createCourseSlice.reducer;