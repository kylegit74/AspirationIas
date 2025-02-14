import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
     

    },
  },
  { timestamps: true }
);

const NoticeModel = mongoose.model("Notice", NoticeSchema);

export default NoticeModel;
