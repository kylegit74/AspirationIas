import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    image: {
        type: String
    },
    description: {
        type: String
    },
    heading: {
        type: String
    },
    Explore_Courses: [
        {
            type:String 
        }
    ]
});



const CourseModel=mongoose.model('CourseModel',CourseSchema);
export default CourseModel;