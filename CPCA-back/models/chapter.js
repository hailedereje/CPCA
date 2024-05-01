import mongoose from 'mongoose'; 
import Lesson from './lesson.js';
const {Schema}  = mongoose; 

const chapterSchema = new Schema({
    title: {type: String, required: true}, 
    lessons: [Lesson.schema]
}); 

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter; 