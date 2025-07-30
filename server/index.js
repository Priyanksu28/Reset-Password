import express from 'express';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

mongoose.connect('mongodb://127.0.0.1:27017/registration-form')

const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))
app.use(express.json());
app.use('/auth', UserRouter);
app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log("Server is running");
    
})