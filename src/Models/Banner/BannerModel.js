import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    link:{
        type:String
    }
}, { timestamps: true });

const BannerModel = mongoose.model('Banner', BannerSchema); // Fix model name
export default BannerModel;
