import cloudinary from "../Configs/CloudinaryConfig.js";
import NoticeModel from "../Models/Notice/NoticeBoardModel.js";
import {
  CreateNoticeService,
  DeleteNoticeByIdService,
  GetAllNoticeServices,
  GetNoticeByIdService,
} from "../Services/NoticeService.js";

export const CreateNoticeController = async (req, res) => {
  try {
    const { text , order} = req.body;
    console.log("text", text);
    if (!text) {
      return res.status(404).json({
        message: "Can not find text",
        success: false,
      });
    }

    const created = await CreateNoticeService({text, order});
    if (!created) {
      return res.status(401).json({
        message: "Can not create notice",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Create successfully",
      created,
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const GetallNoticeController = async (req, res) => {
  try {
    const getall = await GetAllNoticeServices();
    if (!getall) {
      return res.status(404).json({
        message: "Can not geta notice",
        success: false,
      });
    }
    return res.status(201).json(getall);
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const GetNoticeByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: "Can not get id",
        success: false,
      });
    }

    const getNotice = await GetNoticeByIdService(id);

    if (!getNotice) {
      return res.status(404).json({
        message: "Can not find Notice with this id",
        success: false,
      });
    }
    return res.status(201).json(getNotice);
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const DeleteNoticeByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: "Can not find id",
        success: false,
      });
    }
    const deleted = await DeleteNoticeByIdService(id);
    if (!deleted) {
      return res.staus(401).json({
        message: "Can not delete notice",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Deleted successfully",
      deleted,
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const EditNoticeController=async(req,res)=>{
    try{
        const  {text}=req.body;
        const id=req.params.id;
        if(!id)
        {
            return res.status(404).json({
                message:'Can not find id',
                success:false
            })
        }
        if(!text)
        {
            return res.status(404).json({
                message:'please give text',
                success:false
            })
        }
        const exist=await GetNoticeByIdService(id);
        console.log('e',exist)
        if(!exist)
        {
            return res.status(404).json({
                message:'Can not find notice with this id',
                success:false
            })
        }
    const updated=await NoticeModel.findByIdAndUpdate(exist._id,{text:text},{new:true});
    if(updated)
    {
        return res.status(201).json({
            message:'updated successfully',
            success:true
        })
    }
    return res.status(401).json({
        message:'Can not update',
        success:false

    })
    }
    catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
export const EditOrder = async (req, res) => {
  try {
    const { notices } = req.body;

    if (!Array.isArray(notices)) {
      return res.status(400).json({
        message: "Invalid data format: notices must be an array",
        success: false
      });
    }

    console.log("Received notices:", notices);

    for (let i = 0; i < notices.length; i++) {
      if (!notices[i]._id) {
        console.error("Missing _id in notice:", notices[i]);
        continue;
      }

      try {
        const notice = await NoticeModel.findByIdAndUpdate(notices[i]._id, { order: i });
        if (!notice) {
          console.error("No notice found with ID:", notices[i]._id);
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
      }
    }

    return res.status(200).json({
      message: "Order updated successfully",
      success: true
    });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

