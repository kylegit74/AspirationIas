import express from "express";
import mongoose from "mongoose";
import BannerModel from "../Models/Banner/BannerModel.js"

export const CreateBanner = async (imageData) => {
    try {
        const banner = await BannerModel.create(imageData);
        return banner;
    } catch (error) {
        console.error('Error creating banner:', error);
        throw new Error("Failed to save banner");
    }
};


export const FindBannerById=async(id)=>{
    try{
        const Banner=await BannerModel.findById(id);
        return Banner;

    }catch(error)
    {
        return error;
    }
}
export const DeleteBannerByid=async(id)=>{
    try{
        const Deleted=await BannerModel.findByIdAndDelete(id);
        return Deleted;
    }catch(error)
    {
        return error;
    }
}
export const GetAllBanner=async()=>{
    try{
        const Getall=await BannerModel.find({});
        return Getall;
    }catch(error)
    {
        return error;
    }
}