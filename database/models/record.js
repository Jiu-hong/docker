import mongoose from 'mongoose'
const { Schema } = mongoose

const recordSchema = new Schema({
    name: String,
    email: String,
    date: { type: String, default: Date.now() },
    comment: [{ type: String }],
})

export default mongoose.models.Record || mongoose.model('Record', recordSchema)
