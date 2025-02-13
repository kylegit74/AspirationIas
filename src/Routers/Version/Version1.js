import express from 'express'
import BannerRouter from '../BannerRouter.js';
import NoticeRouter from '../NoticeRouter.js';
import CourseRouter from '../CourseRouter.js';
const Version1=express.Router();
Version1.use('/banner',BannerRouter)
Version1.use('/notice',NoticeRouter);
Version1.use('/courses',CourseRouter);
export default Version1;