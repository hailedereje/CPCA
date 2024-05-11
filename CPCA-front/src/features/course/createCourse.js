import { createSlice, nanoid } from "@reduxjs/toolkit";
// import NavbarSection from "react-daisyui/dist/Navbar/NavbarSection";

const ITEM_NAME = 'topic_content';


const initialState = {
    course:{
        id: nanoid(),
        name: "New coures",
        chapters: []
    },
    activeLesson:{
        lesson: {},
        chapterId: "",
        lessonId: ""
    },

    isCourse:false
}

export const createCourseSlice = createSlice({
    name: "createCourse",
    initialState,
    reducers: {
        createCourse: (state,action)=> {
            const { id,name } = action.payload
            console.log(name)
        },
        addChapter: (state, action) => {
            const { name } = action.payload;
            const chapter = { id: nanoid(), name: name, lessons: [] }
            state.course.chapters.push(chapter)

        },
        addLesson: (state, action) => {
            const { name,id } = action.payload
            const lesson = { id: nanoid(), name: name, topics:[]}
            state.course.chapters.find(chapter => chapter.id === id).lessons.push(lesson)
        },
        removeLesson: (state, action) => {
            const { chapterId, lessonId, index } = action.payload;
            let newActiveLesson = state.activeLesson;
        
            const chapter = state.course.chapters.find(chapter => chapter.id === chapterId);
            if (!chapter) return;
        
            const updatedLessons = chapter.lessons.filter((lesson, i) => i !== index);
        
            const updatedChapters = state.course.chapters.map(chapter => {
                if (chapter.id === chapterId) {
                    return { ...chapter, lessons: updatedLessons };
                }
                return chapter;
            });
            
            state.course.chapters = updatedChapters;
        
            if (newActiveLesson.lessonId === lessonId) {
                let nextLessonIndex = index;
                if (nextLessonIndex < updatedLessons.length) {
                    newActiveLesson = {
                        lesson: updatedLessons[nextLessonIndex],
                        chapterId: chapterId,
                        lessonId: updatedLessons[nextLessonIndex].id
                    };
                } else if (nextLessonIndex > 0) { 
                    nextLessonIndex -= 1;
                    newActiveLesson = {
                        lesson: updatedLessons[nextLessonIndex],
                        chapterId: chapterId,
                        lessonId: updatedLessons[nextLessonIndex].id
                    };
                } else { 
                    newActiveLesson = {
                        lesson: {},
                        chapterId: "",
                        lessonId: ""
                    };
                }
            }
        
            state.activeLesson = newActiveLesson;
        },
        
        
        
        renameChapter: (state, action) => {
            var { name, id } = action.payload
            state.course.chapters.find(chapter => chapter.id === id).name = name
        },
        renameLesson: (state, action) => {
            var { name, id, lessonId } = action.payload
            state.course.chapters.find(chapter => chapter.id === id).lessons.find(lesson => lesson.id === lessonId).name = name
        },
        removeChapter: (state, action) => {
            const { chapterId } = action.payload
            console.log(chapterId)
            state.course.chapters = state.course.chapters.filter(chapter => chapter.id !== chapterId);
        },
        updateChapter: (state, action) => {
            const { id, content } = action.payload;
            const chapter = state.course.chapters.find(chapter => chapter.id === id);
            if (chapter) {
                chapter.name = content;
            }
        },

        addTopic: (state, action) => {
            const {chapterId,lessonId,idx,topic} = action.payload;
            const topics = state.course.chapters.find(chapter => chapter.id === chapterId)
                .lessons.find(lesson => lesson.id === lessonId)
            if(topics) {
                topics.topics.splice(idx+1,0,topic)
                state.activeLesson.lesson = topics
            }
            
        },
        removeTopic: (state, action) => {
            const { chapterId, lessonId, topicId } = action.payload;
            const chapter = state.course.chapters.find(chapter => chapter.id === chapterId);
            if (chapter) {
                const lesson = chapter.lessons.find(lesson => lesson.id === lessonId);
                if (lesson) {
                    lesson.topics = lesson.topics.filter(topic => topic.id !== topicId);
                    state.activeLesson.lesson = lesson
                }
            }
        },
        updateTopic: (state, action) => {
            const { chapterId,lessonId,topicId,content } = action.payload;
            const topic = state.course.chapters.find(chapter => chapter.id === chapterId).lessons
                .find(lesson => lesson.id === lessonId).topics.find(topic => topic.id === topicId)
            
            if(topic) {
                topic.content = content
                state.activeLesson.lesson.topics.find(topic => topic.id === topicId).content = content
            }
        },
        setActiveLesson: (state,action) => {
            const { chapterId,lessonId } = action.payload;
            const lesson = state.course.chapters.find(chapter => chapter.id === chapterId).lessons
                .find(lesson => lesson.id === lessonId)
            state.activeLesson = {lesson,chapterId,lessonId}
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

export const { addChapter, removeChapter, updateChapter, 
                renameChapter, renameLesson, addLesson ,
                addTopic,removeTopic,toggleShow,updateTopic
                ,setActiveLesson, removeLesson} = createCourseSlice.actions;
export default createCourseSlice.reducer;