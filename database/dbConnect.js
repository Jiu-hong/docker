import mongoose from 'mongoose'
const connection = {}

async function dbConnect() {
    if (connection.isConnected) {
        return
    }
    //  const db = await mongoose.connect('mongodb://localhost:27017/learn', {
    const db = await mongoose.connect('mongodb://mongo:27017/learn', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })

    connection.isConnected = db.connections[0].readyState
}

export default dbConnect
