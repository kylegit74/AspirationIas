import { CreateNotice, DeleteNoticeById, GetAllNotice, GetNoticeById } from "../Repository/NoticeRepo.js";

export const CreateNoticeService = async (text) => {
  try {
    const created = await CreateNotice(text);
    return created;
  } catch (error) {
    return error;
  }
};
export const GetAllNoticeServices=async()=>{
    try{
        const getall=await GetAllNotice();
        return getall;
    }catch(error)
    {
        return error;
    }
}
export const GetNoticeByIdService=async(id)=>{
    try{
        const get=await GetNoticeById(id);
        console.log('get',get)
        return get;
    }catch(error)
    {
        return error;
    }
}
export const DeleteNoticeByIdService=async(id)=>{
    try{
        const deleted=await DeleteNoticeById(id);
        return deleted;
    }catch(error)
    {
        return error;
    }
}
