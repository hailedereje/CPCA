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
export const deleteChapter = (courseId, chapterId) => newRequests.delete(`/courses/course/chapters/`);

export const fetchLessons = (courseId, chapterId) => newRequests.get(`/courses/${courseId}/chapters/${chapterId}/lessons`);

export const fetchLesson = (lessonId) => newRequests.get(`/courses/course/chapters/chapter/lessons/lesson`,{
    params: {
        lessonId
    }
});


export const createLesson = (data) => newRequests.post(`/courses/course/chapters/chapter/lessons`, data);
export const addLessonItem = (data) => newRequests.post("/courses/course/chapters/chapter/lessons/lesson/add-lesson-item",data)
export const updateLessonItem = (data) => {
    console.log(data)
    return newRequests.post(`/courses/course/chapters/chapter/lessons/lesson/update-lesson-item`,data)
}