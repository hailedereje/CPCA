import newRequests from '@/utils/newRequest';



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

export const uploadImage = (data) => {
    console.log(data)
    return newRequests.post(`/courses/course/chapters/chapter/upload-image`,data)
}

export const deleteChapter = ({courseId, chapterId}) => newRequests.delete(`/courses/course/chapters/chapter`,{params: {courseId,chapterId}});


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

