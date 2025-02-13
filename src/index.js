import express, { urlencoded } from 'express';
import dotenv from 'dotenv'
import Connection from './Configs/DbConfig.js';
import ApiRouter from './Routers/Version/ApiRouter.js';
import cors from 'cors'

dotenv.config();


const app = express(); 
app.use(cors({
    origin: ['https://aspritaionias.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());
app.use(express.urlencoded({extended:true})) 

app.use('/api',ApiRouter);

app.get('/', (req, res) => {
    res.send("Hello");
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    Connection();
});

