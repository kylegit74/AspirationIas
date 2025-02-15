import cloudinary from "../Configs/CloudinaryConfig.js";
import fs from "fs/promises";
import CourseModel from "../Models/Courses/CourseModel.js";
import { CreateCourseService, GetAllCourseService, GetCourseByIdService, DeleteCourseByIdService } from "../Services/CoursesService.js";

export const CreateCourseController = async (req, res) => {
    try {
        let { heading, description, Explore_Courses } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded", success: false });
        }

        if (typeof Explore_Courses === "string") {
            try {
                Explore_Courses = JSON.parse(Explore_Courses);
            } catch (error) {
                Explore_Courses = [Explore_Courses];
            }
        }

        if (!heading || !description || !Explore_Courses.length) {
            return res.status(400).json({ message: "Fill all the fields", success: false });
        }

        const uploaded = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
        await fs.unlink(req.file.path);

        if (!uploaded) {
            return res.status(500).json({ message: "Cannot upload image to Cloudinary", success: false });
        }

        const coursedata = { image: uploaded.secure_url, heading, description, Explore_Courses };
        const created = await CreateCourseService(coursedata);

        if (!created) {
            return res.status(500).json({ message: "Could not upload course", success: false });
        }

        return res.status(201).json({ message: "Uploaded successfully", created, success: true });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetCourseByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "ID is required", success: false });
        }
        const course = await GetCourseByIdService(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found", success: false });
        }
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetAllCourseController = async (req, res) => {
    try {
        const courses = await GetAllCourseService();
        if (!courses) {
            return res.status(404).json({ message: "No courses found", success: false });
        }
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const DeleteCourseByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "ID is required", success: false });
        }
        const deleted = await DeleteCourseByIdService(id);
        if (!deleted) {
            return res.status(404).json({ message: "Course not found", success: false });
        }
        return res.status(200).json({ message: "Deleted successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const EditCourseByidController = async (req, res) => {
    try {
        const id = req.params.id;
        let { heading, description, Explore_Courses } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "ID is required", success: false });
        }
        
        const existing = await GetCourseByIdService(id);
        if (!existing) {
            return res.status(404).json({ message: "Course not found", success: false });
        }
        
        let imageurl = existing.image;
        
        if (req.file) {
            const uploaded = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
            imageurl = uploaded.secure_url;
            await fs.unlink(req.file.path);
        }
        
        if (typeof Explore_Courses === "string") {
            try {
                Explore_Courses = JSON.parse(Explore_Courses);
            } catch (error) {
                Explore_Courses = [Explore_Courses];
            }
        }

        const updated = await CourseModel.findByIdAndUpdate(id, { image: imageurl, heading, description, Explore_Courses }, { new: true });
        if (!updated) {
            return res.status(500).json({ message: "Could not update course", success: false });
        }
        
        return res.status(200).json({ message: "Updated successfully", updated, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
