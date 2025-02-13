import cloudinary from "../Configs/CloudinaryConfig.js";
import fs from "fs/promises";
import CourseModel from "../Models/Courses/CourseModel.js"; 
import { CreateCourseService, GetAllCourseService , GetCourseByIdService ,DeleteCourseByIdService} from "../Services/CoursesService.js";


export const CreateCourseController = async (req, res) => {
    try {
        let { heading, description, Explore_Courses } = req.body;

        if (!req.file || !req.file.path) {
            return res.status(400).json({
                message: "No file uploaded",
                success: false
            });
        }

        const image = req.file.path;

        if (typeof Explore_Courses === "string") {
            try {
                Explore_Courses = JSON.parse(Explore_Courses);
            } catch (error) {
                Explore_Courses = [Explore_Courses]; 
            }
        }

       
        if (!heading || !description || !Explore_Courses.length) {
            return res.status(400).json({
                message: "Fill all the fields",
                success: false
            });
        }
        const uploaded = await cloudinary.uploader.upload(image, { resource_type: "auto" });

        
        await fs.unlink(req.file.path);

        if (!uploaded) {
            return res.status(500).json({
                message: "Cannot upload image to Cloudinary",
                success: false
            });
        }

    
        const coursedata = {
            image: uploaded.secure_url,
            heading,
            description,
            Explore_Courses
        };

        const created = await CreateCourseService(coursedata);
        if (!created) {
            return res.status(500).json({
                message: "Could not upload course",
                success: false
            });
        }

        return res.status(201).json({
            message: "Uploaded successfully",
            created,
            success: true
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const GetCourseByIdController=async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id)
        {
            return res.status(404).json({
                message:'Can not find id',
                success:false
            })
        }
        const get=await GetCourseByIdService(id);
        if(!get)
        {
            return res.status(404).json({
                message:'Can not get course with this id',
                success:false
            })
        }
        return res.status(201).json(get);


    }catch(error)
    {
     return res.status(501).json({
        message:"Internal server error",
        success:false
     })
    }
}
export const GetAllCourseController=async(req,res)=>{
    try{
        const getall=await GetAllCourseService();
        if(!getall)
        {
            return res.status(404).json({
                message:'Can not find ',
                success:false
            })
        }
        return res.status(201).json(getall);

    }catch(error)
    {
        console.log(error)
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
export const DeleteCourseByIdController=async(req,res)=>{
    try{
        const id=req.params.id;
        if(!id)
        {
            return res.status(401).json({
                message:'Cloud not find id',
                success:false
            })
        }
         const deleted=await DeleteCourseByIdService(id);
         if(!deleted)
         {
            return res.status(401).json({
                message:'Could not delete ',
                success:false
            })
         }
         return res.status(201).json({
            message:'Deleted successfully',
            deleted,
            success:true
         })

    }catch(error)
    {
        console.log('error',error)
        return res.status(501).json({
            message:'internal server error ',
            success:false 
        })
    }
}
export const EditCourseByidController=async(req,res)=>{
    try{
        const id=req.params.id;

        let { heading, description, Explore_Courses } = req.body;
        const image=req.file.path;
        if (typeof Explore_Courses === "string") {
            try {
                Explore_Courses = JSON.parse(Explore_Courses); // Convert if it's a stringified array
            } catch (error) {
                Explore_Courses = [Explore_Courses]; // Convert to array if it's a single string
            }
        }

        if(!id)
        {
            return res.status(404).json({
                message:'Id is not found or not valid',
                success:false
            })
        }
        const existing=await GetCourseByIdService(id);
        if(!existing)
        {
            return res.status(404).json({
                message:'Can not find course with this id',
                success:false
            })
        }
        let imageurl=existing.image;
        if(req.file.path)
        {
            const uploaded=await cloudinary.uploader.upload(req.file.path,{resource_type:'auto'});
            imageurl=uploaded.secure_url;
        }
        console.log('image',image,'heading',heading,'description',description,'explore',Explore_Courses);
        const updated=await CourseModel.findByIdAndUpdate(id, {image:imageurl,heading:heading,description:description,Explore_Courses:Explore_Courses},{new:true});
       
        await fs.unlink(req.file.path);
        if(!updated)
        {
            return res.status(401).json({
                message:'Could not updte ',
                success:false
            })
        }
        return res.status(201).json({
            message:'updated succesfully ',
            updated,
            success:true
        });  

    }catch(error)
    {
        console.log('error',error)
        return res.status(501).json({
            message:'Internal server error',
            success:true
        })
    }
}