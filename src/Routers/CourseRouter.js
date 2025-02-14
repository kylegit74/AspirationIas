import express from "express";
import upload from "../Configs/MulterConfig.js";
import { CreateCourseController, DeleteCourseByIdController, EditCourseByidController, GetAllCourseController, GetCourseByIdController } from "../Controllers/CoursesController.js";

const CourseRouter=express.Router();
CourseRouter.post('/create',upload.single('image'),CreateCourseController);
CourseRouter.get('/getcourse/:id',GetCourseByIdController);
CourseRouter.get('/getall', GetAllCourseController);
CourseRouter.delete('/delete/:id',DeleteCourseByIdController);
CourseRouter.put('/edit/:id',upload.single('image'),EditCourseByidController);

export default CourseRouter;