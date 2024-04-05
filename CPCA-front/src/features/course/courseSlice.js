import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    course: []
}

const courseSlice = createSlice({
    name: 'course',
    initialState, 
    reducers: {
        setCourse: (state, action) => {
            const course = {...action.payload.course}; 
            state.course = course; 
        }
    } 

})

export default courseSlice.reducer 
export const {setCourse} = courseSlice.actions;  