import express from 'express';
import upload from '../Configs/MulterConfig.js';
import { CreateBannerController,  DeleteBannerByIdController,  EditBannerController, GetAllBannerController } from '../Controllers/BannerController.js';
const BannerRouter=express.Router();
BannerRouter.post('/create',upload.single('image'),CreateBannerController);
BannerRouter.delete('/delete/:id',DeleteBannerByIdController);
BannerRouter.get('/getallbanner',GetAllBannerController);
BannerRouter.put('/edit/:id',upload.single('image'),EditBannerController)
export default BannerRouter;