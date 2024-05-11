import { db } from "@/db/db";
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialCourse = {
    id:nanoid(),
    name:"",
    author:"",
    duration:"",
    level:"",
    prerequisits:[],
    tags:[],
    chapters:[],
}

const initialState = {
    course: initialCourse
}
export const newCourseSlice = createSlice({
    name: "newSlice",
    initialState,
    reducers: {
        createCourse: (state,action) => {
            const { name, author, duration, level } = action.payload
            state.course = {...state.course,name,author,duration,level}
            db.courses.add(state.course).then(() => {
                console.log('Course added successfully!');
            });
        },
        addPrerequistes: (state,action) => {
            const { prerequisite } = action.payload
            state.course.prerequisits.push(prerequisite)
        },
        addTags: (state,action) => {
            const { tag } = action.payload
            state.course.tags.push(tag)
        }

    }
})

export const { createCourse, addPrerequistes, addTags} = newCourseSlice.actions
export default newCourseSlice.reducer