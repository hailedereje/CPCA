import mongoose, { Schema } from 'mongoose'; 


const chapterSchema = new Schema({
    title: {type: String, required: true}, 
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    quiz: {type: Schema.Types.ObjectId, ref: "Quiz" }
}); 

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter; 