import express from 'express';
import Version1 from './Version1.js';
const ApiRouter=express.Router();
ApiRouter.use('/v1',Version1);

export default ApiRouter;