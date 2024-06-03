import mongoose, { Schema } from "mongoose";

const labSchema = new Schema({
    title: {type: String ,required: true},
    description: {type: String ,required: true},
    labManual: {type: String ,required: true},
    courseId: {type: Schema.Types.ObjectId, ref:"Course"}
})

const Lab = mongoose.model('Lab',labSchema)
export default Lab;