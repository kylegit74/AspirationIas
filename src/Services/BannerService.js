import { CreateBanner, DeleteBannerByid, FindBannerById, GetAllBanner } from "../Repository/BannerRepo.js";

export const CreateBannerService = async (imageData) => {
    try {
        return await CreateBanner(imageData);
    } catch (error) {
        console.error("Error in CreateBannerService:", error);
        throw new Error("Failed to process banner creation");
    }
};
export const FindBannerByIdService=async(id)=>{
    try{
        const Banner=await FindBannerById(id);
        return Banner;
    }catch(error)
    {
        return error;
    }
}
export const DeleteBannerByIdService=async(id)=>{
    try{
        const Deleted=await DeleteBannerByid(id);
        return Deleted;

    }catch(error)
    {
        return error;
    }

}
export const GetAllBannerService=async()=>{
    try{
        const getall=await GetAllBanner();
        return getall;

    }catch(error)
    {
        return error;
    }
}
