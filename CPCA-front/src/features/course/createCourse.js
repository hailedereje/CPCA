import { db } from "@/db/db";
import { createSlice, nanoid } from "@reduxjs/toolkit";

const table = "courses"

const initialState = {
    course:{
        id:nanoid(),
        name:"course-1",
        chapters:[]
    },
    draftCourses: await db.table(table).toArray().then(data => data),
    activeLesson:{},
    prerequisites:[],
    tags:[],
    instructors:[]
}


export const createCourseSlice = createSlice({
    name: "createCourse",
    initialState,
    reducers: {
        createCourse: (state,action) =>  {
            const { course } = action.payload
            state.course = {...course,id:course._id}
            state.draftCourses.push(state.course)
            db.table(table).add(state.course)
        },
        setCourse: (state,action) => {
            
        },
        setPrerequistes: (state,action) => {
            const { prerequisites } = action.payload
            state.prerequisites = prerequisites
        },

        setTags: (state,action) => {
            const { tags } = action.payload
            state.tags = tags
        },
        setInstructors: (state,action) => {
            const { instructors } = action.payload
            state.instructors = instructors
        },

        deleteTag: (state,action) => {
            const {id} = action.payload
            state.tags= state.tags.filter(tag => tag.id !== id)
        },
        deletePrerequisite: (state,action) => {
            const {id} = action.payload
            state.prerequisites = state.prerequisites.filter(tag => tag.id !== id)
        },
        addChapter: (state, action) => {
            const { name } = action.payload;
            const chapter = { id: nanoid(), name: name, lessons: [],quiz:{} }
            state.course.chapters.push(chapter)

        },
     
      
        setActiveLesson: (state,action) => {
            const { chapterId,lessonId } = action.payload;
            const chapter = state.course.chapters.find(chapter => chapter.id === chapterId)
            const lesson = chapter.lessons.find(lesson => lesson.id === lessonId)
            state.activeLesson = {chapterName:chapter.name,lesson,chapterId,lessonId}
        },
        toggleShow: (state, action) => { 
            const { chapterId,lessonId,topicId } = action.payload;
            const topic = state.activeLesson.lesson.topics.find(topic => topic.id === topicId)
            if(topic) {
                topic.show = !topic.show
            }
        },

    }
})

export const { toggleShow
                ,setActiveLesson,createCourse,setPrerequistes,setTags ,
                deletePrerequisite,deleteTag, setInstructors} = createCourseSlice.actions;
export default createCourseSlice.reducer;