import Dexie from "dexie";
export const db = new Dexie("courseDatabase")

db.version(1).stores({
    courses: '++id, name', // Primary key (`id`), course name (`name`)
    chapters: '[courseId+id], courseId, name', // Composite key (`courseId`, `id`), course ID (`courseId`), chapter name (`name`)
    lessons: '[chapterId+id], chapterId, name, content' // Composite key (`chapterId`, `id`), chapter ID (`chapterId`), lesson name (`name`), lesson content (`content`)
});