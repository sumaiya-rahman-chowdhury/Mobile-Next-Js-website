import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    image: String,
  },
  { collection: "mobileList" },
  { timestamps: true }
);

const Mobile = mongoose.models.Mobile || mongoose.model("Mobile", mobileSchema);
export default Mobile;
