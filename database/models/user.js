import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, default: Date.now() },
    comment: [String],
    images: [String],
})

export default mongoose.models.User || mongoose.model('User', userSchema)
