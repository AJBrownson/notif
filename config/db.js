const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        const conn = await mongoose.connect(process.env.CONNECTION_URI)

        console.log(`Connected successfully to MongoDB!: ${conn.connection.host}`)

    } catch (error) {
        console.log(`Cannot connect to MongoDB. ` + error)
        process.exit(1)
    }
}


module.exports = connectDB;