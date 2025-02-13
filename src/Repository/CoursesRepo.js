import CourseModel from "../Models/Courses/CourseModel.js";

export const CreateCourse=async(formdata)=>{
    try{
        const  created=await CourseModel.create(formdata);
        return created;

    }catch(error)
    {
        return error;
    }
}
export const  GetCourseById=async(id)=>{
    try{
        const get=await CourseModel.findById(id);
        return get;

    }catch(error)
    {
        return error;

    }
}
 export const GetAllCourse=async()=>{
    try{
        const getall=await CourseModel.find({});
        return getall;
        
    }catch(error)
    {
        return error;
    }
 }
 export const DeleteCourseById=async(id)=>{
    try{
        const deleted=await CourseModel.findByIdAndDelete(id);
        return deleted

    }catch(error)
    {
        return error;
    }
 }
