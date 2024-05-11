import Dexie from "dexie";
export const db = new Dexie("courseDatabase")

db.version(1).stores({
    courses: '++id, name, author, duration, level, prerequisits, tags, chapters'
});