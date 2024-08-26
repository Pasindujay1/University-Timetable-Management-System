import mongoose from "mongoose";

const uniResourceSchema = new mongoose.Schema(
  {
    res_code: {
      type: String,
      required: [true, "Resource Id is required"],
      unique: true,
    },
    res_name: {
      type: String,
      required: [true, "Resource name is required"],
    },
    res_type: {
      type: String,
      required: [true, "Resource type is required"],
    },
  },
  {
    timestamps: true,
  }
);

const UniResource = mongoose.model("UniResource", uniResourceSchema);

export default UniResource;
