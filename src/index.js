import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Connection from './Configs/DbConfig.js';
import ApiRouter from './Routers/Version/ApiRouter.js';

dotenv.config();

const app = express();

const allowedOrigins = [
    "http://localhost:3000",  // Development
    "https://aspritaionias.vercel.app"  // Correct Vercel URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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
    console.log(`🚀 Server is running on ${PORT} (${process.env.NODE_ENV})`);
    Connection();
});
