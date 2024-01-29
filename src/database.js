const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const ConnectDB = async () => {
    console.log('Connecting to MongoDB...', process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connection SUCCESS')
    } catch (error) {
        console.log('MongoDB connection FAIL')
        process.exit(1)
    }
}

module.exports = ConnectDB

