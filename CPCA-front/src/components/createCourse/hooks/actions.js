import newRequests from '@/utils/newRequest';

export const getCourses = () => newRequests.get("/courses/all/drafts")
export const createCourse = (data) => newRequests.post("/courses/new",data)
export const getCourse = (courseId) => newRequests.get(`/courses/course`, { params: { id: courseId }})
export const updateCourse = ({data,courseId}) => newRequests.put(`/courses/course/${courseId}`,data)
export const deleteCourse = ({courseId}) => newRequests.delete(`/courses/course/${courseId}`)

export const createLab = (data) => newRequests.post("/courses/course/labs",data)
export const updateLab = (data) => newRequests.put(`/courses/course/labs/lab/${data.labId}`,data.labForm)
export const deleteLab = ({courseId,labId}) => newRequests.delete(`/courses/course/labs/lab/${labId}`,{params: {courseId,labId}})
export const fetchLabs = (courseId) => newRequests.get(`/courses/course/labs/${courseId}`)
export const fetchLab = (labId) => newRequests.get(`/courses/course/labs/lab/${labId}`)    

export const addDescription =  (data) =>  newRequests.post("/courses/course/add-description", data)

export const fetchChapters = (courseId) => newRequests.get(`/courses/course/chapters`, {
    params: {
        courseId
    }
});
export const fetchChapter = (courseId, chapterId) => newRequests.get(`/courses/course/chapters/chapter`,{
    params: {
        courseId,
        chapterId
    }
});

export const renameChapter = (data) => newRequests.post("courses/course/chapters/chapter/rename",data)

export const createChapter = (data) => newRequests.post(`/courses/course/chapters`, data);

export const updateChapter = (courseId, chapterId, data) => newRequests.put(`/courses/course/chapters/chapter`, data,{
    params: {
        courseId,
        chapterId
    }
});

export const uploadImage = (data) => newRequests.post(`/courses/course/chapters/chapter/upload-image`,data)

export const deleteChapter = ({courseId, chapterId,lessonIds}) => newRequests.delete(`/courses/course/chapters/chapter`,{data: {lessonIds},params: {courseId,chapterId}});


export const fetchLessons = ({chapterId}) => newRequests.get(`/courses/course/chapters/chapter/lessons`,{params: {chapterId}});

export const fetchLesson = (lessonId) => newRequests.get(`/courses/course/chapters/chapter/lessons/lesson`,{
    params: {
        lessonId
    }
});

export const deleteLesson = ({chapterId,lessonId}) => newRequests.delete(`/courses/course/chapters/chapter/lessons/lesson`,{
    params: {
        lessonId,
        chapterId
    }
});

export const createLesson = (data) => newRequests.post(`/courses/course/chapters/chapter/lessons`, data);
export const addLessonItem = (data) => newRequests.post("/courses/course/chapters/chapter/lessons/lesson/add-lesson-item",data)
export const updateLessonItem = (data) => {
    return newRequests.post(`/courses/course/chapters/chapter/lessons/lesson/update-lesson-item`,data)
}
export const deleteLessonItem = ({lessonId,lessonItemId}) => {
    return newRequests.delete(`/courses/course/chapters/chapter/lessons/${lessonId}/delete-lesson-item/${lessonItemId}`)
}


// quiz
export const fetchQuiz = (quizId) => newRequests.get(`/quiz/${quizId}`);
export const createQuiz = (data) => newRequests.post("/quiz/new",data)
export const updateQuiz = (data) => newRequests.put("/quiz",data)
export const createQuestion = (data) => newRequests.post("/quiz_question",data)
export const updateQuestion = (data,questionId) => newRequests.put(`/quiz_question/${questionId}`,data)
export const deleteQuestion = (questionId) => newRequests.delete(`/quiz/question/${questionId}`)

export const completeQuiz = (data) =>  newRequests.post(`/progress/submit_quiz_progess`,data)

