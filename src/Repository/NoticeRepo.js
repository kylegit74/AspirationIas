import NoticeModel from "../Models/Notice/NoticeBoardModel.js";
import mongoose from "mongoose";

export const CreateNotice=async(obj)=>{
    try{
        const created=await NoticeModel.create(obj);
         return created;


    }catch(error)
    {
        return error;
    }
}
export const GetAllNotice=async()=>{
    try{
        const getall=await NoticeModel.find({});
        return getall;

    }catch(error)
    {
        return error;
    }
}

export const GetNoticeById = async (id) => {
    try {
        console.log("Received ID:", id);

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid Notice ID:", id);
            throw new Error("Invalid ID format");
        }

        const notice = await NoticeModel.findById(id);
        console.log("Found Notice:", notice);

        if (!notice) {
            throw new Error("Notice not found");
        }

        return notice;
    } catch (error) {
        console.error("Error fetching notice:", error);
        throw error;
    }
};


export const DeleteNoticeById=async(id)=>{
    try{
        const deleted=await NoticeModel.findByIdAndDelete(id);
        return deleted;
    }catch(error)
    {
        return error;
    }
}