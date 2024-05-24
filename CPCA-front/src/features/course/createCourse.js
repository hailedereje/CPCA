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
    tags:[]
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
            if (state.activeLesson.chapterId === id) {
                state.activeLesson.chapterName = name
            }
        },
        renameLesson: (state, action) => {
            var { name, id, lessonId } = action.payload
            state.course.chapters.find(chapter => chapter.id === id).lessons.find(lesson => lesson.id === lessonId).name = name
            if(state.activeLesson.lessonId === lessonId) {
                state.activeLesson.lesson.name = name
            }
        },
        removeChapter: (state, action) => {
            const { chapterId } = action.payload
            state.course.chapters = state.course.chapters.filter(chapter => chapter.id !== chapterId);
        },
        updateChapter: (state, action) => {
            const { id, content } = action.payload;
            const chapter = state.course.chapters.find(chapter => chapter.id === id);
            if (chapter) {
                chapter.name = content;
            }
        },
        addQuiz: (state,action) => {
            const { name,id } = action.payload
            const quiz = { 
                id:nanoid(),
                chapterId:id,
                name,duration:0,
                instruction:"",
                questions:[]
            }
            state.course.chapters.find(chapter => chapter.id === id).quiz = {...quiz}
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

export const { addChapter, removeChapter, updateChapter, 
                renameChapter, renameLesson, addLesson ,
                addTopic,removeTopic,toggleShow,updateTopic
                ,setActiveLesson, removeLesson,addQuiz,createCourse,setPrerequistes,setTags ,deletePrerequisite,deleteTag} = createCourseSlice.actions;
export default createCourseSlice.reducer;