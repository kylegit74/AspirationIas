import express from 'express';
import dotenv from 'dotenv';
import Connection from './Configs/DbConfig.js';
import ApiRouter from './Routers/Version/ApiRouter.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Set CORS dynamically
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://aspirationias.vercel.app'  // ✅ Vercel URL
        : 'http://localhost:3000',  // ✅ Localhost for Development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ApiRouter);

app.get('/', (req, res) => {
    res.send("Hello, World! Your app is running in " + process.env.NODE_ENV);
});

// Ensure PORT is set
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${process.env.NODE_ENV === 'production' ? 'https://aspirationias.vercel.app' : 'http://localhost:3000'} (ENV: ${process.env.NODE_ENV})`);
    Connection();
});
