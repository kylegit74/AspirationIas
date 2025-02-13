import express from 'express';
import { CreateNoticeController, DeleteNoticeByIdController, EditNoticeController, GetallNoticeController, GetNoticeByIdController } from '../Controllers/NoticeController.js';
const NoticeRouter=express.Router();
NoticeRouter.post('/create',CreateNoticeController);
NoticeRouter.get('/getallnotice',GetallNoticeController);
NoticeRouter.get('/getnotice/:id',GetNoticeByIdController);
NoticeRouter.delete('/delete/:id',DeleteNoticeByIdController);
NoticeRouter.put('/edit/:id',EditNoticeController);
export default NoticeRouter;
