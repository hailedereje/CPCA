// src/db.js
import Dexie from 'dexie';

export const db = new Dexie('coursesDB');
db.version(2).stores({
    courses: '++id, title',
    chapters: '++id, courseId, title',
    lessons: '++id, chapterId, title',
    contents: '++id, lessonId,type,content'
});

