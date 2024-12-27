import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import router from './router/index.js'
const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())


const server = http.createServer(app)

server.listen(2000, () => {
    console.log('✨ Server running on http://localhost:2000')
}).on('error', (error: Error) => {
    if ((error as any).code === 'EADDRINUSE') {
        console.log('❌ Port 2000 is already in use. Please try another port or kill the process using this port.')
    } else {
        console.log('❌ Server error:', error)
    }
})


const MONGODB_URL = "mongodb+srv://marouanebazghifan:770108459@cluster0.8yoq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!')
    })
    .catch((error: Error) => {
        console.log('❌ MongoDB Connection Error:', error)
    })

// Monitor MongoDB connection
mongoose.connection.on('connected', () => {
    console.log('🟢 MongoDB Connected')
})

mongoose.connection.on('error', (error: Error) => {
    console.log('🔴 MongoDB Error:', error)
})

mongoose.connection.on('disconnected', () => {
    console.log('🟡 MongoDB Disconnected')
})

// Handle application termination
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('MongoDB connection closed due to app termination')
    process.exit(0)
})

// app.use('/',router())