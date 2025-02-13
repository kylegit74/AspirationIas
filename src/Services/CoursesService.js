import { CreateCourse, DeleteCourseById, GetAllCourse, GetCourseById } from "../Repository/CoursesRepo.js"

export const CreateCourseService=async(formdata)=>{
    try{
        const created=await CreateCourse(formdata);
        return created

    }catch(error)
    {
      return error;
    }
}
export const GetCourseByIdService=async(id)=>{
    try{
        const created=await GetCourseById(id);
        return created;
    }catch(error)
    {
        throw error;
    }
}
export const GetAllCourseService=async()=>{
    try{

         const getall=await GetAllCourse();
         return getall;
    }catch(error)
    {
        return error;
    }
}
export const DeleteCourseByIdService=async(id)=>{
    try{
        const deleted=await DeleteCourseById(id);
        return deleted;

    }catch(error)
    {
        return  error;
    }
}